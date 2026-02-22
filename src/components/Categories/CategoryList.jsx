'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from './CategoryCard';
import styles from './CategoryManager.module.css';

const CategoryList = ({ 
  onEdit = null, 
  onDelete = null,
  onReorder = null,
  editable = true 
}) => {
  const { categories, isLoading, error, reorderCategories } = useCategories();
  const [draggedItem, setDraggedItem] = useState(null);
  const [localCategories, setLocalCategories] = useState(categories);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      return;
    }

    try {
      const newOrder = [...categories];
      const [draggedCategory] = newOrder.splice(draggedItem, 1);
      newOrder.splice(dropIndex, 0, draggedCategory);
      
      setLocalCategories(newOrder);
      await reorderCategories(newOrder);
      onReorder?.(newOrder);
    } catch (err) {
      console.error('Erro ao reordenar:', err);
      setLocalCategories(categories);
    } finally {
      setDraggedItem(null);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>⏳ Carregando categorias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>❌ Erro ao carregar: {error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>💫</div>
        <h3>Nenhuma categoria encontrada</h3>
        <p>Crie sua primeira categoria para começar!</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h3>Minhas Categorias ({categories.length})</h3>
        {editable && draggedItem !== null && (
          <span className={styles.dragHint}>🔗 Solte para reordenar</span>
        )}
      </div>

      <div className={styles.grid}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`${styles.gridItem} ${draggedItem === index ? styles.dragging : ''}`}
            draggable={editable}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={() => setDraggedItem(null)}
          >
            <CategoryCard
              category={category}
              onEdit={() => onEdit?.(category)}
              onDelete={() => onDelete?.(category)}
              editable={editable}
            />
          </div>
        ))}
      </div>

      {editable && (
        <div className={styles.hint}>
          🗑️ Dica: Arraste os cartões para reordenar as categorias
        </div>
      )}
    </div>
  );
};

export default CategoryList;