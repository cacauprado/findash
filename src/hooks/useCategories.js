'use client';

import { useContext, useCallback, useState, useEffect } from 'react';
import { useAuth } from './useAuth'; // Assumindo que já existe
import { categoryService } from '@/services/categoryService';
import { CategoriesContext } from '@/contexts/CategoriesContext';

/**
 * 🦦 Hook para gerenciar categorias
 * Fornece CRUD completo e acesso ao estado
 * 
 * @returns {Object} { categories, isLoading, error, createCategory, updateCategory, deleteCategory, reorderCategories, loadCategories, initializeDefaults }
 */
export const useCategories = () => {
  const { user } = useAuth();
  const context = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 📥 Carregar categorias do Firestore
   */
  const loadCategories = useCallback(async () => {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const categories = await categoryService.getCategories(user.uid);
      context.setCategories(categories);
    } catch (err) {
      console.error('❌ Erro ao carregar categorias:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user?.uid, context]);

  /**
   * ➡️ Criar nova categoria
   */
  const createCategory = useCallback(async (categoryData) => {
    if (!user?.uid) {
      throw new Error('Usuário não autenticado');
    }

    // Validar nome duplicado
    const isDuplicate = await categoryService.isDuplicateName(
      user.uid,
      categoryData.name
    );
    if (isDuplicate) {
      throw new Error('Já existe uma categoria com este nome');
    }
    
    try {
      const newCategory = await categoryService.createCategory(
        user.uid,
        categoryData
      );
      context.setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.error('❌ Erro ao criar categoria:', err);
      throw err;
    }
  }, [user?.uid, context]);

  /**
   * ✍️ Atualizar categoria existente
   */
  const updateCategory = useCallback(async (categoryId, categoryData) => {
    try {
      // Validar nome duplicado (excluindo a categoria atual)
      const isDuplicate = await categoryService.isDuplicateName(
        user?.uid,
        categoryData.name,
        categoryId
      );
      if (isDuplicate) {
        throw new Error('Já existe uma categoria com este nome');
      }

      const updated = await categoryService.updateCategory(
        categoryId,
        categoryData
      );
      context.setCategories(prev =>
        prev.map(cat => cat.id === categoryId ? updated : cat)
      );
      return updated;
    } catch (err) {
      console.error('❌ Erro ao atualizar categoria:', err);
      throw err;
    }
  }, [user?.uid, context]);

  /**
   * ❌ Deletar categoria
   */
  const deleteCategory = useCallback(async (categoryId) => {
    try {
      await categoryService.deleteCategory(categoryId);
      context.setCategories(prev =>
        prev.filter(cat => cat.id !== categoryId)
      );
    } catch (err) {
      console.error('❌ Erro ao deletar categoria:', err);
      throw err;
    }
  }, [context]);

  /**
   * 🔄 Reordenar categorias
   */
  const reorderCategories = useCallback(async (reorderedList) => {
    try {
      await categoryService.reorderCategories(reorderedList);
      context.setCategories(reorderedList);
    } catch (err) {
      console.error('❌ Erro ao reordenar categorias:', err);
      throw err;
    }
  }, [context]);

  /**
   * 🎁 Inicializar categorias padrão
   */
  const initializeDefaults = useCallback(async () => {
    if (!user?.uid) {
      throw new Error('Usuário não autenticado');
    }

    try {
      await categoryService.initializeDefaultCategories(user.uid);
      await loadCategories();
    } catch (err) {
      console.error('❌ Erro ao inicializar categorias padrão:', err);
      throw err;
    }
  }, [user?.uid, loadCategories]);

  // Carregar categorias ao montar
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    // Estado
    categories: context.categories || [],
    isLoading,
    error,

    // Métodos CRUD
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    loadCategories,
    initializeDefaults,
  };
};
