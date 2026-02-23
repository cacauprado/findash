'use client';

import React, { useState } from 'react';
import { CategoryIcon } from '../CategoryIcon';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import styles from './CategoryCard.module.css';

/**
 * 🎴 Card individual de categoria com ações
 * @param {Object} category - Dados da categoria
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para deletar
 * @param {boolean} isDragging - Se está sendo arrastado (reorder)
 * @param {Object} dragHandleProps - Props para drag handle
 */
export const CategoryCard = ({
  category,
  onEdit,
  onDelete,
  isDragging = false,
  dragHandleProps = {},
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handle delete com confirmação
   */
  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await onDelete?.(category.id);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('❌ Erro ao deletar:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      style={{
        borderLeftColor: category.color,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {/* Drag Handle */}
      <div className={styles.dragHandle} {...dragHandleProps}>
        <GripVertical size={18} color="#ccc" />
      </div>

      {/* Icon e Info */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div
            className={styles.icon}
            style={{ backgroundColor: category.color }}
          >
            <CategoryIcon
              iconName={category.icon}
              size={24}
              color="white"
            />
          </div>
          <div className={styles.info}>
            <h4 className={styles.name}>{category.name}</h4>
            {category.description && (
              <p className={styles.description}>{category.description}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        {category.metadata && (
          <div className={styles.metadata}>
            <span className={styles.stat}>
              📊 {category.metadata.totalTransactions} transação(ões)
            </span>
            <span className={styles.stat}>
              💰 R$ {(category.metadata.totalAmount || 0).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onEdit?.(category)}
          title="Editar"
          aria-label="Editar categoria"
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => setShowDeleteConfirm(true)}
          title="Deletar"
          aria-label="Deletar categoria"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmContent}>
            <h5 className={styles.confirmTitle}>Deletar categoria?</h5>
            <p className={styles.confirmMessage}>
              Tem certeza que deseja deletar "<strong>{category.name}</strong>"?
              <br />
              <span className={styles.confirmHint}>
                (As transações não serão deletadas)
              </span>
            </p>
            <div className={styles.confirmButtons}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.confirmDelete}
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? '🗑️ Deletando...' : '🗑️ Deletar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
