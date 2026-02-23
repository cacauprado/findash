'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { AVAILABLE_ICONS, COLOR_PALETTE } from '@/utils/defaultCategories';
import IconPicker from './IconPicker';
import ColorPicker from './ColorPicker';
import './CategoryForm.css';

/**
 * 📝 Formulário para criar/editar categorias
 * @param {Object} props
 * @param {Object} props.category - Categoria para editar (undefined para novo)
 * @param {Function} props.onClose - Callback ao fechar
 * @param {Function} props.onSuccess - Callback ao sucesso
 */
export default function CategoryForm({ category, onClose, onSuccess }) {
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#FF6B6B',
    icon: 'tag',
  });

  // Estados de controle
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const { createCategory, updateCategory } = useCategories();
  const isEditing = !!category;

  // Inicializar com dados da categoria
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        color: category.color,
        icon: category.icon,
      });
    }
  }, [category]);

  /**
   * 🔐 Validar formulário
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Nome máximo 50 caracteres';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Descrição máximo 200 caracteres';
    }

    if (!formData.color || !/^#[0-9A-F]{6}$/i.test(formData.color)) {
      newErrors.color = 'Cor inválida';
    }

    if (!formData.icon) {
      newErrors.icon = 'Ícone obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 💾 Submeter formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Verifique os campos em vermelho');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditing) {
        await updateCategory(category.id, formData);
      } else {
        await createCategory(formData);
      }

      setSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Erro ao salvar categoria');
      console.error('❌ Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 📝 Atualizar campo
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <div className="category-form-overlay">
      <div className="category-form-container">
        {/* Header */}
        <div className="category-form-header">
          <h2>{isEditing ? '✏️ Editar Categoria' : '➕ Nova Categoria'}</h2>
          <button
            onClick={onClose}
            className="category-form-close"
            disabled={isLoading}
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mensagens de sucesso/erro */}
        {success && (
          <div className="category-form-message success">
            <CheckCircle size={20} />
            <span>{isEditing ? 'Categoria atualizada!' : 'Categoria criada!'}</span>
          </div>
        )}

        {error && (
          <div className="category-form-message error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="category-form">
          {/* Campo: Nome */}
          <div className="form-group">
            <label htmlFor="name">Nome da Categoria *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Alimentação"
              maxLength={50}
              disabled={isLoading}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <span className="field-error">{errors.name}</span>
            )}
            <span className="field-counter">
              {formData.name.length}/50
            </span>
          </div>

          {/* Campo: Descrição */}
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Descreva a categoria (opcional)"
              maxLength={200}
              disabled={isLoading}
              rows={3}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
            <span className="field-counter">
              {formData.description.length}/200
            </span>
          </div>

          {/* Divisor */}
          <div className="form-divider" />

          {/* Row: Cor e Ícone */}
          <div className="form-row">
            {/* Campo: Cor */}
            <div className="form-group">
              <label>Cor *</label>
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="color-picker-button"
                disabled={isLoading}
                style={{
                  backgroundColor: formData.color,
                  borderColor: formData.color,
                }}
                title={formData.color}
              >
                <span>{formData.color}</span>
              </button>
              {showColorPicker && (
                <ColorPicker
                  value={formData.color}
                  onChange={(color) => {
                    handleChange('color', color);
                    setShowColorPicker(false);
                  }}
                  palette={COLOR_PALETTE}
                />
              )}
              {errors.color && (
                <span className="field-error">{errors.color}</span>
              )}
            </div>

            {/* Campo: Ícone */}
            <div className="form-group">
              <label>Ícone *</label>
              <button
                type="button"
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="icon-picker-button"
                disabled={isLoading}
                title="Clique para escolher um ícone"
              >
                <span className="icon-preview">●</span>
                <span className="icon-name">{formData.icon}</span>
              </button>
              {showIconPicker && (
                <IconPicker
                  value={formData.icon}
                  onChange={(icon) => {
                    handleChange('icon', icon);
                    setShowIconPicker(false);
                  }}
                  icons={AVAILABLE_ICONS}
                />
              )}
              {errors.icon && (
                <span className="field-error">{errors.icon}</span>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="form-preview">
            <div
              className="preview-card"
              style={{ backgroundColor: formData.color + '20' }}
            >
              <div
                className="preview-color-dot"
                style={{ backgroundColor: formData.color }}
              />
              <div className="preview-content">
                <div className="preview-name">{formData.name || 'Nova Categoria'}</div>
                <div className="preview-description">
                  {formData.description || 'Sem descrição'}
                </div>
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || success}
              className="btn btn-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  {isEditing ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                <>{isEditing ? '✏️ Atualizar' : '✅ Criar'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
