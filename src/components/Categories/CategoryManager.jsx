'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import styles from './CategoryManager.module.css';

const CategoryManager = () => {
  const { deleteCategory } = useCategories();
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (category) => {
    try {
      await deleteCategory(category.id);
      setDeletingCategory(null);
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  const handleDeleteConfirm = (category) => {
    setDeletingCategory(category);
  };

  return (
    <div className={styles.managerContainer}>
      <div className={styles.managerHeader}>
        <div>
          <h1>📁 Gerenciar Categorias</h1>
          <p>Crie, edite e organize suas categorias de despesas</p>
        </div>
        {!showForm && (
          <button 
            className={styles.btnPrimary}
            onClick={() => setShowForm(true)}
          >
            + Nova Categoria
          </button>
        )}
      </div>

      <div className={styles.managerContent}>
        {showForm && (
          <div className={styles.formSection}>
            <CategoryForm
              initialData={editingCategory}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        <div className={styles.listSection}>
          <CategoryList
            onEdit={handleEditCategory}
            onDelete={handleDeleteConfirm}
          />
        </div>
      </div>

      {/* Modal de Confirmação de Delete */}
      {deletingCategory && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>⚠️</div>
            <h3>Deletar Categoria?</h3>
            <p>
              Tem certeza que deseja deletar "<strong>{deletingCategory.name}</strong>"?
            </p>
            <p className={styles.modalWarning}>
              Esta ação não pode ser desfeita.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.btnSecondary}
                onClick={() => setDeletingCategory(null)}
              >
                Cancelar
              </button>
              <button
                className={`${styles.btnPrimary} ${styles.btnDanger}`}
                onClick={() => handleDeleteCategory(deletingCategory)}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;