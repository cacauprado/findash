'use client';

import { useState, useRef, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import * as LucideIcons from 'lucide-react';
import { Search, ChevronDown } from 'lucide-react';
import styles from './CategoryManager.module.css';

const CategorySelector = ({ 
  value = null, 
  onChange = null,
  placeholder = 'Selecione uma categoria...',
  searchable = true,
  clearable = true 
}) => {
  const { categories, isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const selectedCategory = categories.find(c => c.id === value);
  
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (category) => {
    onChange?.(category.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(null);
    setSearchTerm('');
  };

  const IconComponent = selectedCategory && LucideIcons[selectedCategory.icon];

  return (
    <div className={styles.selectorContainer} ref={containerRef}>
      <button
        type="button"
        className={`${styles.selectorButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        {selectedCategory ? (
          <div className={styles.selectedCategory}>
            <div 
              className={styles.selectedIcon}
              style={{ color: selectedCategory.color }}
            >
              {IconComponent && <IconComponent size={20} />}
            </div>
            <span className={styles.selectedName}>{selectedCategory.name}</span>
          </div>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}

        <div className={styles.selectorControls}>
          {clearable && selectedCategory && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              title="Limpar seleção"
            >
              ×
            </button>
          )}
          <ChevronDown 
            size={20} 
            className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className={styles.selectorDropdown}>
          {searchable && (
            <div className={styles.searchWrapper}>
              <Search size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}

          <div className={styles.optionsContainer}>
            {filteredCategories.length === 0 ? (
              <div className={styles.noResults}>
                {searchTerm ? '🔍 Nenhuma categoria encontrada' : '💫 Nenhuma categoria disponível'}
              </div>
            ) : (
              filteredCategories.map(category => {
                const Icon = LucideIcons[category.icon];
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.option} ${value === category.id ? styles.selected : ''}`}
                    onClick={() => handleSelect(category)}
                  >
                    <div 
                      className={styles.optionIcon}
                      style={{ color: category.color }}
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                    <div className={styles.optionContent}>
                      <div className={styles.optionName}>{category.name}</div>
                      {category.description && (
                        <div className={styles.optionDesc}>{category.description}</div>
                      )}
                    </div>
                    {value === category.id && (
                      <div className={styles.checkmark}>✓</div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;