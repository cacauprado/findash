'use client';

import React, { useState, useCallback } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { CategoryCard } from './CategoryCard';
import { CategoryForm } from '../Forms/CategoryForm';
import { Loader, Plus } from 'lucide-react';
import styles from './CategoryList.module.css';

/**
 * 📛 Lista de categorias com CRUD completo
 * @param {Object} options - Opções de exibição
 * @param {boolean} options.showForm - Mostrar formulário de criação
 * @param {boolean} options.editable - Permitir edição/deleção
 */
export const CategoryList = ({
  showForm = true,
  editable = true,
} = {}) => {
  const {
    categories,
    isLoading,
    error,
    deleteCategory,
    loadCategories,
  } = useCategories();

  const [editingCategory, setEditingCategory] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  /**
   * Handle edit
   */
  const handleEdit = useCallback((category) => {
    setEditingCategory(category);
    setShowNewForm(false);
  }, []);

  /**
   * Handle delete
   */
  const handleDelete = useCallback(async (categoryId) => {
    if (window.confirm('Tem certeza que deseja deletar esta categoria?')) {
      await deleteCategory(categoryId);
    }
  }, [deleteCategory]);

  /**
   * Handle form success
   */
  const handleFormSuccess = useCallback(() => {
    setEditingCategory(null);
    setShowNewForm(false);
    loadCategories();
  }, [loadCategories]);

  /**
   * Handle form cancel
   */
  const handleFormCancel = useCallback(() => {
    setEditingCategory(null);
    setShowNewForm(false);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={32} className={styles.spinner} />
        <p>Carregando categorias...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>❌ {error}</p>
        <button
          onClick={loadCategories}
          className={styles.retryButton}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          🌟 Categorias ({categories.length})
        </h2>
        {showForm && editable && (
          <button
            onClick={() => {
              setShowNewForm(!showNewForm);
              setEditingCategory(null);
            }}
            className={styles.newButton}
          >
            <Plus size={18} />
            Nova Categoria
          </button>
        )}
      </div>

      {/* Forms */}
      {showNewForm && !editingCategory && (
        <CategoryForm
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {/* Empty state */}
      {categories.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🌟</div>
          <h3 className={styles.emptyTitle}>Nenhuma categoria</h3>
          <p className={styles.emptyMessage}>
            Crie sua primeira categoria para começar a organizar suas transações.
          </p>
          {showForm && editable && (
            <button
              onClick={() => setShowNewForm(true)}
              className={styles.emptyButton}
            >
              ➕ Criar Primeira Categoria
            </button>
          )}
        </div>
      ) : (
        <div className={styles.listContainer}>
          <div className={styles.list}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={editable ? handleEdit : undefined}
                onDelete={editable ? handleDelete : undefined}
              />
            ))}
          </div>

          {/* List footer */}
          <div className={styles.footer}>
            <span className={styles.footerText}>
              Total: <strong>{categories.length}</strong> categoria(s)
            </span>
            {categories.some(c => c.metadata?.totalTransactions > 0) && (
              <span className={styles.footerStat}>
                💰 R$ {categories
                  .reduce((sum, c) => sum + (c.metadata?.totalAmount || 0), 0)
                  .toFixed(2)
                }
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
