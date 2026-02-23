import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DEFAULT_CATEGORIES } from '@/utils/defaultCategories';

/**
 * 🔧 Serviço para operações CRUD de categorias
 * Camada de abstração entre componentes e Firestore
 */
class CategoryService {
  /**
   * 📥 Obter todas as categorias ativas do usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<Array>} Lista de categorias ordenadas
   */
  async getCategories(userId) {
    try {
      const q = query(
        collection(db, 'categories'),
        where('userId', '==', userId),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error);
      throw new Error(`Falha ao carregar categorias: ${error.message}`);
    }
  }

  /**
   * 🔍 Obter categoria por ID
   * @param {string} categoryId - ID da categoria
   * @returns {Promise<Object|null>} Categoria ou null
   */
  async getCategory(categoryId) {
    try {
      const docRef = doc(db, 'categories', categoryId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      console.error('❌ Erro ao buscar categoria:', error);
      throw error;
    }
  }

  /**
   * ➡️ Criar nova categoria
   * @param {string} userId - ID do usuário
   * @param {Object} categoryData - Dados da categoria
   * @returns {Promise<Object>} Categoria criada com ID
   */
  async createCategory(userId, categoryData) {
    try {
      // Validar dados
      this.validateCategory(categoryData);

      // Obter próxima ordem
      const categories = await this.getCategories(userId);
      const nextOrder = Math.max(...categories.map(c => c.order), -1) + 1;

      const docRef = await addDoc(collection(db, 'categories'), {
        userId,
        ...categoryData,
        order: nextOrder,
        isActive: true,
        metadata: {
          totalTransactions: 0,
          totalAmount: 0,
          lastUsedAt: null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      });

      return {
        id: docRef.id,
        userId,
        ...categoryData,
        order: nextOrder,
        isActive: true,
        metadata: {
          totalTransactions: 0,
          totalAmount: 0,
          lastUsedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      };
    } catch (error) {
      console.error('❌ Erro ao criar categoria:', error);
      throw error;
    }
  }

  /**
   * ✍️ Atualizar categoria existente
   * @param {string} categoryId - ID da categoria
   * @param {Object} categoryData - Novos dados
   * @returns {Promise<Object>} Categoria atualizada
   */
  async updateCategory(categoryId, categoryData) {
    try {
      this.validateCategory(categoryData);

      const docRef = doc(db, 'categories', categoryId);
      
      // Obter dados atuais para manter metadata
      const current = await this.getCategory(categoryId);
      
      await updateDoc(docRef, {
        ...categoryData,
        metadata: {
          ...current?.metadata,
          updatedAt: serverTimestamp(),
        }
      });

      const updated = await this.getCategory(categoryId);
      return updated;
    } catch (error) {
      console.error('❌ Erro ao atualizar categoria:', error);
      throw error;
    }
  }

  /**
   * ❌ Deletar categoria (soft delete)
   * @param {string} categoryId - ID da categoria
   */
  async deleteCategory(categoryId) {
    try {
      const docRef = doc(db, 'categories', categoryId);
      
      // Obter dados atuais
      const current = await this.getCategory(categoryId);
      
      await updateDoc(docRef, {
        isActive: false,
        metadata: {
          ...current?.metadata,
          updatedAt: serverTimestamp(),
        }
      });
    } catch (error) {
      console.error('❌ Erro ao deletar categoria:', error);
      throw error;
    }
  }

  /**
   * 🔄 Reordenar categorias
   * @param {Array} reorderedCategories - Array com categorias em nova ordem
   */
  async reorderCategories(reorderedCategories) {
    try {
      const batch = writeBatch(db);

      reorderedCategories.forEach((cat, index) => {
        const docRef = doc(db, 'categories', cat.id);
        batch.update(docRef, {
          order: index,
          metadata: {
            ...cat.metadata,
            updatedAt: serverTimestamp(),
          }
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('❌ Erro ao reordenar categorias:', error);
      throw error;
    }
  }

  /**
   * 🎁 Inicializar categorias padrão para novo usuário
   * @param {string} userId - ID do novo usuário
   */
  async initializeDefaultCategories(userId) {
    try {
      const batch = writeBatch(db);

      DEFAULT_CATEGORIES.forEach((category) => {
        const docRef = doc(collection(db, 'categories'));
        batch.set(docRef, {
          userId,
          ...category,
          isDefault: true,
          isActive: true,
          metadata: {
            totalTransactions: 0,
            totalAmount: 0,
            lastUsedAt: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
        });
      });

      await batch.commit();
      console.log('✅ Categorias padrão inicializadas');
    } catch (error) {
      console.error('❌ Erro ao inicializar categorias padrão:', error);
      throw error;
    }
  }

  /**
   * 🔐 Validar dados da categoria
   * @param {Object} categoryData - Dados a validar
   * @throws {Error} Se dados inválidos
   */
  validateCategory(categoryData) {
    const { name, color, icon } = categoryData;

    // Nome obrigatório
    if (!name || name.trim().length === 0) {
      throw new Error('Nome da categoria é obrigatório');
    }

    // Nome máximo 50 caracteres
    if (name.length > 50) {
      throw new Error('Nome deve ter no máximo 50 caracteres');
    }

    // Cor em formato hex válido
    if (!color || !/^#[0-9A-F]{6}$/i.test(color)) {
      throw new Error('Cor inválida (use formato hex: #RRGGBB)');
    }

    // Ícone obrigatório
    if (!icon || icon.trim().length === 0) {
      throw new Error('Ícone é obrigatório');
    }

    return true;
  }

  /**
   * 🔍 Checar se categoria tem mesmo nome
   * @param {string} userId - ID do usuário
   * @param {string} name - Nome a validar
   * @param {string} excludeId - ID da categoria a excluir da busca
   */
  async isDuplicateName(userId, name, excludeId = null) {
    try {
      const categories = await this.getCategories(userId);
      return categories.some(
        c => c.name.toLowerCase() === name.toLowerCase() 
          && c.id !== excludeId
      );
    } catch (error) {
      console.error('❌ Erro ao validar duplicação:', error);
      return false;
    }
  }
}

// Exportar singleton
export const categoryService = new CategoryService();
