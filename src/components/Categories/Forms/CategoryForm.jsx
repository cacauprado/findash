'use client';

import React, { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { CategoryColorPicker } from '../Pickers/CategoryColorPicker';
import { CategoryIconPicker } from '../Pickers/CategoryIconPicker';
import { AlertCircle, Loader } from 'lucide-react';
import styles from './CategoryForm.module.css';

/**
 * 📝 Formário para criar/editar categorias
 * @param {Object} category - Categoria a editar (null = novo)
 * @param {Function} onSuccess - Callback ao salvar com sucesso
 * @param {Function} onCancel - Callback ao cancelar
 */
export const CategoryForm = ({ category = null, onSuccess, onCancel }) => {
  const { createCategory, updateCategory } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || '',
    color: category?.color || '#FF6B6B',
    icon: category?.icon || 'tag',
  });

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Handle color selection
   */
  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  /**
   * Handle icon selection
   */
  const handleIconChange = (icon) => {
    setFormData(prev => ({
      ...prev,
      icon
    }));
  };

  /**
   * Validar formulário
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome não pode ter mais de 50 caracteres';
    }

    if (formData.description.length > 200) {
      newErrors.description = 'Descrição não pode ter mais de 200 caracteres';
    }

    if (!formData.color || !/^#[0-9A-F]{6}$/i.test(formData.color)) {
      newErrors.color = 'Cor inválida';
    }

    if (!formData.icon) {
      newErrors.icon = 'Ícone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      if (category?.id) {
        // Editar categoria existente
        await updateCategory(category.id, formData);
      } else {
        // Criar nova categoria
        await createCategory(formData);
      }

      // Limpar formulário
      setFormData({
        name: '',
        description: '',
        color: '#FF6B6B',
        icon: 'tag',
      });
      setErrors({});

      onSuccess?.();
    } catch (err) {
      console.error('❌ Erro ao salvar categoria:', err);
      setErrors({
        submit: err.message || 'Erro ao salvar categoria'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Title */}
      <h3 className={styles.title}>
        {category ? '✏️ Editar Categoria' : '➕ Nova Categoria'}
      </h3>

      {/* Error geral */}
      {errors.submit && (
        <div className={styles.errorAlert}>
          <AlertCircle size={16} />
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Nome */}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nome da Categoria <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ex: Alimentação"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          maxLength={50}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span className={styles.errorText}>{errors.name}</span>
        )}
        <span className={styles.charCount}>
          {formData.name.length}/50
        </span>
      </div>

      {/* Descrição */}
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Descrição <span className={styles.hint}>(opcional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Ex: Comida, restaurantes, supermercado"
          className={styles.textarea}
          rows={3}
          maxLength={200}
          disabled={isSubmitting}
        />
        <span className={styles.charCount}>
          {formData.description.length}/200
        </span>
      </div>

      {/* Color Picker */}
      <div className={styles.formGroup}>
        <CategoryColorPicker
          selectedColor={formData.color}
          onSelect={handleColorChange}
        />
        {errors.color && (
          <span className={styles.errorText}>{errors.color}</span>
        )}
      </div>

      {/* Icon Picker */}
      <div className={styles.formGroup}>
        <CategoryIconPicker
          selectedIcon={formData.icon}
          onSelect={handleIconChange}
          categoryColor={formData.color}
        />
        {errors.icon && (
          <span className={styles.errorText}>{errors.icon}</span>
        )}
      </div>

      {/* Preview */}
      <div className={styles.previewSection}>
        <label className={styles.label}>Preview</label>
        <div className={styles.preview}>
          <div
            className={styles.previewIcon}
            style={{ backgroundColor: formData.color }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className={styles.previewInfo}>
            <div className={styles.previewName}>{formData.name || 'Nome da categoria'}</div>
            <div className={styles.previewDesc}>{formData.description || 'Descrição'}</div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.buttonCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={styles.buttonSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader size={16} className={styles.spinner} />
              Salvando...
            </>
          ) : (
            category ? '✏️ Atualizar' : '➕ Criar'
          )}
        </button>
      </div>
    </form>
  );
};
