'use client';

import React, { useState, useMemo } from 'react';
import { AVAILABLE_ICONS } from '@/utils/defaultCategories';
import { CategoryIcon } from '../CategoryIcon';
import { Search, Check } from 'lucide-react';
import styles from './CategoryIconPicker.module.css';

/**
 * 🎯 Picker de ícones com busca
 * @param {string} selectedIcon - Ícone selecionado
 * @param {Function} onSelect - Callback ao selecionar ícone
 * @param {string} categoryColor - Cor da categoria (para preview)
 */
export const CategoryIconPicker = ({
  selectedIcon = 'tag',
  onSelect,
  categoryColor = '#95A5A6',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  // Filtrar ícones com base na busca
  const filteredIcons = useMemo(() => {
    if (!searchTerm.trim()) return AVAILABLE_ICONS;
    return AVAILABLE_ICONS.filter(icon =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className={styles.pickerContainer}>
      {/* Preview do ícone selecionado */}
      <div className={styles.previewSection}>
        <label className={styles.label}>Ícone da Categoria</label>
        <button
          type="button"
          className={styles.previewButton}
          style={{ borderColor: categoryColor }}
          onClick={() => setExpanded(!expanded)}
          title={selectedIcon}
        >
          <CategoryIcon
            iconName={selectedIcon}
            size={28}
            color={categoryColor}
          />
          <span className={styles.previewText}>{selectedIcon}</span>
        </button>
      </div>

      {/* Grid de ícones com busca */}
      {expanded && (
        <div className={styles.pickerPanel}>
          {/* Search input */}
          <div className={styles.searchContainer}>
            <Search size={18} color="#666" />
            <input
              type="text"
              placeholder="Buscar ícone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className={styles.clearButton}
              >
                ✗
              </button>
            )}
          </div>

          {/* Icon grid */}
          <div className={styles.iconGrid}>
            {filteredIcons.length > 0 ? (
              filteredIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={styles.iconOption}
                  onClick={() => {
                    onSelect(icon);
                    setExpanded(false);
                    setSearchTerm('');
                  }}
                  title={icon}
                  aria-label={`Ícone ${icon}`}
                >
                  <CategoryIcon
                    iconName={icon}
                    size={24}
                    color={categoryColor}
                  />
                  {selectedIcon === icon && (
                    <div className={styles.checkmark}>
                      <Check size={14} color="white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className={styles.noResults}>
                Nenhum ícone encontrado para "{searchTerm}"
              </div>
            )}
          </div>

          {/* Results count */}
          <div className={styles.resultsCount}>
            {filteredIcons.length} ícone(s)
          </div>
        </div>
      )}
    </div>
  );
};
