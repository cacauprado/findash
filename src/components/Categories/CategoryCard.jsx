'use client';

import { Edit2, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import styles from './CategoryManager.module.css';

const CategoryCard = ({ 
  category, 
  onEdit = null, 
  onDelete = null,
  editable = true 
}) => {
  const IconComponent = LucideIcons[category.icon];

  const handleDeleteClick = () => {
    if (window.confirm(`Tem certeza que deseja deletar "${category.name}"?`)) {
      onDelete?.();
    }
  };

  return (
    <div className={styles.card}>
      {/* Header com cor */}
      <div 
        className={styles.cardHeader}
        style={{ backgroundColor: category.color }}
      >
        <div className={styles.cardIcon}>
          {IconComponent && <IconComponent size={32} />}
        </div>
      </div>

      {/* Conteúdo */}
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{category.name}</h4>
        
        {category.description && (
          <p className={styles.cardDescription}>{category.description}</p>
        )}

        {/* Metadata */}
        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Cor:</span>
            <div className={styles.colorBadge} style={{ backgroundColor: category.color }}>
              {category.color}
            </div>
          </div>
          
          {category.metadata?.totalTransactions > 0 && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Transações:</span>
              <span className={styles.metaValue}>{category.metadata.totalTransactions}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ações */}
      {editable && (
        <div className={styles.cardActions}>
          {onEdit && (
            <button
              className={styles.actionBtn}
              onClick={onEdit}
              title="Editar categoria"
              aria-label="Editar"
            >
              <Edit2 size={18} />
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
              onClick={handleDeleteClick}
              title="Deletar categoria"
              aria-label="Deletar"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;