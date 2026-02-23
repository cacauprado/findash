'use client';

import {
  Edit2,
  Trash2,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import './CategoryCard.css';

/**
 * 🎨 Card individual de categoria
 * @param {Object} props
 * @param {Object} props.category - Dados da categoria
 * @param {Function} props.onEdit - Callback de edição
 * @param {Function} props.onDelete - Callback de deleção
 * @param {boolean} props.isDeleting - Estado de deleção
 * @param {boolean} props.isSelectable - Modo seleção
 */
export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  isDeleting = false,
  isSelectable = false,
}) {
  return (
    <div className="category-card">
      {/* Background color accent */}
      <div
        className="category-card-accent"
        style={{ backgroundColor: category.color + '20' }}
      />

      {/* Conteúdo principal */}
      <div className="category-card-content">
        {/* Cabeçalho */}
        <div className="category-card-header">
          {/* Indicador de cor */}
          <div
            className="category-card-color-indicator"
            style={{ backgroundColor: category.color }}
            title={category.color}
          />

          {/* Título */}
          <h3 className="category-card-title">{category.name}</h3>

          {/* Badge (se houver) */}
          {category.isDefault && (
            <span className="category-badge">Padrão</span>
          )}
        </div>

        {/* Descrição */}
        {category.description && (
          <p className="category-card-description">
            {category.description}
          </p>
        )}

        {/* Informações meta */}
        <div className="category-card-meta">
          {/* Ícone */}
          <div className="meta-item">
            <span className="meta-label">Ícone:</span>
            <span className="meta-value">{category.icon}</span>
          </div>

          {/* Transações (se tiver) */}
          {category.metadata?.totalTransactions > 0 && (
            <div className="meta-item">
              <span className="meta-label">Transações:</span>
              <span className="meta-value meta-highlight">
                {category.metadata.totalTransactions}
              </span>
            </div>
          )}
        </div>

        {/* Total gasto (se tiver) */}
        {category.metadata?.totalAmount > 0 && (
          <div className="category-card-total">
            <span className="total-label">Total:</span>
            <span className="total-value">
              R$ {(category.metadata.totalAmount).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="category-card-actions">
        {isSelectable && (
          <div className="action-indicator">
            <ChevronRight size={18} />
          </div>
        )}

        {!isSelectable && (
          <>
            <button
              onClick={() => onEdit(category)}
              className="card-action-btn edit"
              title="Editar categoria"
              aria-label="Editar categoria"
            >
              <Edit2 size={18} />
            </button>

            <button
              onClick={() => onDelete()}
              className="card-action-btn delete"
              disabled={isDeleting}
              title="Deletar categoria"
              aria-label="Deletar categoria"
            >
              {isDeleting ? (
                <Loader2 size={18} className="spinner" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </>
        )}
      </div>

      {/* Overlay de seleção */}
      {isSelectable && (
        <div className="category-card-overlay" />
      )}
    </div>
  );
}
