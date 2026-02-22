'use client';

import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { AVAILABLE_ICONS, COLOR_PALETTE } from '@/utils/defaultCategories';
import * as LucideIcons from 'lucide-react';
import styles from './CategoryManager.module.css';

const CategoryForm = ({ 
  initialData = null, 
  onSuccess = null, 
  onCancel = null 
}) => {
  const { createCategory, updateCategory, isLoading } = useCategories();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#FF6B6B',
    icon: 'utensils',
  });
  const [error, setError] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        color: initialData.color,
        icon: initialData.icon,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
    setShowColorPicker(false);
  };

  const handleIconSelect = (icon) => {
    setFormData(prev => ({
      ...prev,
      icon
    }));
    setShowIconPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      
      if (!formData.name.trim()) {
        throw new Error('Nome da categoria é obrigatório');
      }

      if (initialData?.id) {
        await updateCategory(initialData.id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
          color: formData.color,
          icon: formData.icon,
        });
      } else {
        await createCategory({
          name: formData.name.trim(),
          description: formData.description.trim(),
          color: formData.color,
          icon: formData.icon,
        });
      }
      
      setFormData({
        name: '',
        description: '',
        color: '#FF6B6B',
        icon: 'utensils',
      });
      
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    }
  };

  const IconComponent = LucideIcons[formData.icon];

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>{initialData ? 'Editar Categoria' : 'Nova Categoria'}</h3>
        
        {/* Nome */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Alimentação"
            maxLength={50}
            className={styles.input}
            disabled={isLoading}
          />
          <span className={styles.counter}>{formData.name.length}/50</span>
        </div>

        {/* Descrição */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ex: Comida, restaurantes, supermercado"
            rows="3"
            className={styles.textarea}
            disabled={isLoading}
          />
        </div>

        {/* Cor e Ícone */}
        <div className={styles.row}>
          {/* Color Picker */}
          <div className={styles.formGroup}>
            <label>Cor</label>
            <div className={styles.colorPickerWrapper}>
              <button
                type="button"
                className={styles.colorButton}
                style={{ backgroundColor: formData.color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
                title={formData.color}
              />
              <span className={styles.colorValue}>{formData.color}</span>
            </div>
            
            {showColorPicker && (
              <div className={styles.colorPickerDropdown}>
                <div className={styles.colorGrid}>
                  {COLOR_PALETTE.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={styles.colorOption}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Icon Picker */}
          <div className={styles.formGroup}>
            <label>Ícone</label>
            <div className={styles.iconPickerWrapper}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setShowIconPicker(!showIconPicker)}
              >
                {IconComponent && <IconComponent size={20} />}
                <span>{formData.icon}</span>
              </button>
            </div>

            {showIconPicker && (
              <div className={styles.iconPickerDropdown}>
                <div className={styles.iconGrid}>
                  {AVAILABLE_ICONS.map((icon) => {
                    const Icon = LucideIcons[icon];
                    return (
                      <button
                        key={icon}
                        type="button"
                        className={styles.iconOption}
                        onClick={() => handleIconSelect(icon)}
                        title={icon}
                        aria-label={`Select icon ${icon}`}
                      >
                        {Icon && <Icon size={20} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pré-visualização */}
        <div className={styles.preview}>
          <div className={styles.previewLabel}>Pré-visualização:</div>
          <div className={styles.previewCard} style={{ borderLeftColor: formData.color }}>
            {IconComponent && (
              <div className={styles.previewIcon} style={{ color: formData.color }}>
                <IconComponent size={24} />
              </div>
            )}
            <div className={styles.previewContent}>
              <div className={styles.previewName}>{formData.name || 'Nome'}</div>
              <div className={styles.previewDesc}>
                {formData.description || 'Descrição'}
              </div>
            </div>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className={styles.error}>
            <span>❌</span> {error}
          </div>
        )}

        {/* Botões */}
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isLoading || !formData.name.trim()}
          >
            {isLoading ? '⏳ Salvando...' : initialData ? 'Atualizar' : 'Criar'}
          </button>
          {onCancel && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;