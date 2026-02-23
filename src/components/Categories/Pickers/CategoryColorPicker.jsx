'use client';

import React, { useState } from 'react';
import { COLOR_PALETTE } from '@/utils/defaultCategories';
import { Check } from 'lucide-react';
import styles from './CategoryColorPicker.module.css';

/**
 * 🎨 Picker de cores organizadas em grupos
 * @param {string} selectedColor - Cor selecionada (hex)
 * @param {Function} onSelect - Callback ao selecionar cor
 */
export const CategoryColorPicker = ({ selectedColor = '#FF6B6B', onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  // Organizar cores por grupo (8 cores cada)
  const colorGroups = [];
  for (let i = 0; i < COLOR_PALETTE.length; i += 8) {
    colorGroups.push(COLOR_PALETTE.slice(i, i + 8));
  }

  return (
    <div className={styles.pickerContainer}>
      {/* Preview da cor selecionada */}
      <div className={styles.previewSection}>
        <label className={styles.label}>Cor da Categoria</label>
        <button
          type="button"
          className={styles.previewButton}
          style={{
            backgroundColor: selectedColor,
            borderColor: selectedColor,
          }}
          onClick={() => setExpanded(!expanded)}
          title={selectedColor}
        >
          <span className={styles.previewText}>{selectedColor}</span>
        </button>
      </div>

      {/* Grid de cores */}
      {expanded && (
        <div className={styles.colorGrid}>
          {colorGroups.map((group, groupIdx) => (
            <div key={groupIdx} className={styles.colorGroup}>
              {group.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={styles.colorOption}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    onSelect(color);
                    setExpanded(false);
                  }}
                  title={color}
                  aria-label={`Cor ${color}`}
                >
                  {selectedColor === color && (
                    <Check size={16} color="white" strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
