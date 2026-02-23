'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import './CategorySelector.css';

/**
 * 🗳️ Selector dropdown para categorias
 * Usado em formulários de transação
 * @param {Object} props
 * @param {string} props.value - ID da categoria selecionada
 * @param {Function} props.onChange - Callback ao mudar
 * @param {string} props.placeholder - Placeholder
 * @param {boolean} props.disabled - Desabilitar
 * @param {string} props.label - Label do campo
 */
export default function CategorySelector({
  value,
  onChange,
  placeholder = 'Selecione uma categoria',
  disabled = false,
  label,
}) {
  const { categories, isLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Categoria selecionada
  const selectedCategory = categories.find(c => c.id === value);

  /**
   * 🔍 Filtrar categorias por busca
   */
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * 🔔 Fechar dropdown ao clicar fora
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * 📄 Selecionar categoria
   */
  const handleSelect = (category) => {
    onChange?.(category);
    setIsOpen(false);
    setSearchTerm('');
  };

  /**
   * 🗘 Limpar seleção
   */
  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(null);
    setSearchTerm('');
  };

  /**
   * ⌨️ Navegabilidade com teclado
   */
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        break;
      default:
        break;
    }
  };

  return (
    <div className="category-selector-container" ref={containerRef}>
      {label && (
        <label className="category-selector-label">
          {label}
        </label>
      )}

      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isLoading}
        className={`category-selector-button ${
          selectedCategory ? 'has-value' : ''
        } ${isOpen ? 'open' : ''}`}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      >
        <div className="selector-button-content">
          {selectedCategory ? (
            <>
              <div
                className="selector-color"
                style={{ backgroundColor: selectedCategory.color }}
              />
              <span className="selector-text">
                {selectedCategory.name}
              </span>
            </>
          ) : (
            <span className="selector-placeholder">{placeholder}</span>
          )}
        </div>

        <div className="selector-icons">
          {selectedCategory && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="selector-clear"
              aria-label="Limpar seleção"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={18}
            className={`selector-chevron ${isOpen ? 'open' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="category-selector-dropdown">
          {/* Busca */}
          {categories.length > 5 && (
            <div className="selector-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {/* Lista */}
          <div className="selector-options">
            {filteredCategories.length === 0 ? (
              <div className="selector-empty">
                <p>Nenhuma categoria encontrada</p>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelect(category)}
                  className={`selector-option ${
                    selectedCategory?.id === category.id ? 'selected' : ''
                  }`}
                >
                  <div
                    className="option-color"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="option-content">
                    <div className="option-name">{category.name}</div>
                    {category.description && (
                      <div className="option-description">
                        {category.description}
                      </div>
                    )}
                  </div>
                  {selectedCategory?.id === category.id && (
                    <div className="option-checkmark">✓</div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
