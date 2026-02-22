import { categoryService } from '@/services/categoryService';

const state = {
  categories: [],
  isLoading: false,
  error: null,
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },

  ADD_CATEGORY(state, category) {
    state.categories.push(category);
  },

  UPDATE_CATEGORY(state, updatedCategory) {
    const index = state.categories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },

  DELETE_CATEGORY(state, categoryId) {
    state.categories = state.categories.filter(c => c.id !== categoryId);
  },

  REORDER_CATEGORIES(state, reorderedCategories) {
    state.categories = reorderedCategories;
  },

  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  /**
   * 📥 Carregar categorias do Firestore
   */
  async loadCategories({ commit }, userId) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      const categories = await categoryService.getCategories(userId);
      commit('SET_CATEGORIES', categories);
    } catch (error) {
      console.error('❌ Erro ao carregar categorias:', error);
      commit('SET_ERROR', error.message);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  /**
   * ➡️ Criar nova categoria
   */
  async createCategory({ commit }, { userId, categoryData }) {
    try {
      // Validar nome duplicado
      const isDuplicate = await categoryService.isDuplicateName(
        userId,
        categoryData.name
      );
      if (isDuplicate) {
        throw new Error('Já existe uma categoria com este nome');
      }

      commit('CLEAR_ERROR');
      const newCategory = await categoryService.createCategory(
        userId,
        categoryData
      );
      commit('ADD_CATEGORY', newCategory);
      return newCategory;
    } catch (error) {
      console.error('❌ Erro ao criar categoria:', error);
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  /**
   * ✍️ Atualizar categoria existente
   */
  async updateCategory({ commit }, { userId, categoryId, categoryData }) {
    try {
      // Validar nome duplicado (excluindo a categoria atual)
      const isDuplicate = await categoryService.isDuplicateName(
        userId,
        categoryData.name,
        categoryId
      );
      if (isDuplicate) {
        throw new Error('Já existe uma categoria com este nome');
      }

      commit('CLEAR_ERROR');
      const updated = await categoryService.updateCategory(
        categoryId,
        categoryData
      );
      commit('UPDATE_CATEGORY', updated);
      return updated;
    } catch (error) {
      console.error('❌ Erro ao atualizar categoria:', error);
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  /**
   * ❌ Deletar categoria
   */
  async deleteCategory({ commit }, categoryId) {
    try {
      commit('CLEAR_ERROR');
      await categoryService.deleteCategory(categoryId);
      commit('DELETE_CATEGORY', categoryId);
    } catch (error) {
      console.error('❌ Erro ao deletar categoria:', error);
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  /**
   * 🔄 Reordenar categorias
   */
  async reorderCategories({ commit }, reorderedList) {
    try {
      commit('CLEAR_ERROR');
      await categoryService.reorderCategories(reorderedList);
      commit('REORDER_CATEGORIES', reorderedList);
    } catch (error) {
      console.error('❌ Erro ao reordenar categorias:', error);
      commit('SET_ERROR', error.message);
      throw error;
    }
  },

  /**
   * 🎁 Inicializar categorias padrão
   */
  async initializeDefaults({ commit, dispatch }, userId) {
    try {
      commit('CLEAR_ERROR');
      commit('SET_LOADING', true);
      await categoryService.initializeDefaultCategories(userId);
      await dispatch('loadCategories', userId);
    } catch (error) {
      console.error('❌ Erro ao inicializar categorias padrão:', error);
      commit('SET_ERROR', error.message);
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

const getters = {
  getCategories: state => state.categories,
  getCategoriesCount: state => state.categories.length,
  isLoading: state => state.isLoading,
  getError: state => state.error,
  getCategoryById: state => id => state.categories.find(c => c.id === id),
  getCategoriesByName: state => name =>
    state.categories.filter(c => c.name.toLowerCase().includes(name.toLowerCase())),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
