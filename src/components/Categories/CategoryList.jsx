'use client';

import { useState, useCallback } from 'react';
import {
  Edit2,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  GripHorizontal,
  Search,
} from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import './CategoryList.css';

/**
 * 📊 Lista de categorias com grid responsivo
 * @param {Object} props
 * @param {Function} props.onSelectCategory - Callback ao selecionar categoria
 * @param {boolean} props.selectable - Modo seleção (usado em transações)
 */
export default function CategoryList({
  onSelectCategory,
  selectable = false,
}) {
  // Estado global
  const {
    categories,
    isLoading,
    error,
    deleteCategory,
    reorderCategories,
    loadCategories,
  } = useCategories();

  // Estados locais
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);

  // Sincronizar com categories global
  const displayCategories = sortedCategories.length > 0 ? sortedCategories : categories;

  /**
   * 🔍 Filtrar categorias por busca
   */
  const filteredCategories = displayCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * 📄 Abrir formulário (novo ou editar)
   */
  const handleNewCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  /**
   * ❌ Deletar categoria
   */
  const handleDeleteCategory = async (id) => {
    if (deletingId) return; // Impedir múltiplos cliques

    const confirmed = window.confirm(
      'Você tem certeza? Esta ação não pode ser desfeita.'
    );

    if (!confirmed) return;

    setDeletingId(id);
    setDeleteError(null);

    try {
      await deleteCategory(id);
      // Recarregar lista
      await loadCategories();
    } catch (err) {
      setDeleteError(err.message || 'Erro ao deletar categoria');
      console.error('❌ Erro:', err);
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * 🖀 Drag and Drop - Início
   */
  const handleDragStart = (e, category) => {
    setDraggedItem(category);
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * 🖀 Drag and Drop - Sobre elemento
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  /**
   * 🖀 Drag and Drop - Drop
   */
  const handleDrop = useCallback(async (e, targetCategory) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.id === targetCategory.id) {
      setDraggedItem(null);
      return;
    }

    // Encontrar índices
    const dragIndex = displayCategories.findIndex(c => c.id === draggedItem.id);
    const targetIndex = displayCategories.findIndex(c => c.id === targetCategory.id);

    if (dragIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    // Criar nova ordem
    const newOrder = [...displayCategories];
    const [movedItem] = newOrder.splice(dragIndex, 1);
    newOrder.splice(targetIndex, 0, movedItem);

    setSortedCategories(newOrder);

    try {
      await reorderCategories(newOrder);
    } catch (err) {
      console.error('❌ Erro ao reordenar:', err);
      // Reverter em caso de erro
      setSortedCategories([]);
    } finally {
      setDraggedItem(null);
    }
  }, [displayCategories, draggedItem, reorderCategories]);

  /**
   * 👇 Selecionar categoria (modo selectável)
   */
  const handleSelectCategory = (category) => {
    if (selectable) {
      onSelectCategory?.(category);
    }
  };

  /**
   * 📄 Callback ao sucesso de criar/editar
   */
  const handleFormSuccess = async () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setSortedCategories([]); // Limpar ordem customizada
    await loadCategories();
  };

  // Estado: Carregando
  if (isLoading) {
    return (
      <div className="category-list-container">
        <div className="category-list-empty">
          <Loader2 className="spinner" size={40} />
          <p>⏳ Carregando categorias...</p>
        </div>
      </div>
    );
  }

  // Estado: Erro global
  if (error) {
    return (
      <div className="category-list-container">
        <div className="category-list-error">
          <AlertCircle size={40} />
          <p>❌ {error}</p>
          <button
            onClick={loadCategories}
            className="btn btn-secondary btn-small"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-list-container">
      {/* Header com ações */}
      <div className="category-list-header">
        <div className="header-title">
          <h2>📄 Meus Categorias</h2>
          <span className="category-count">{filteredCategories.length}</span>
        </div>
        <button
          onClick={handleNewCategory}
          className="btn btn-primary btn-icon"
          title="Criar nova categoria"
        >
          <Plus size={20} />
          <span>Nova</span>
        </button>
      </div>

      {/* Erro de deleção */}
      {deleteError && (
        <div className="category-list-alert error">
          <AlertCircle size={20} />
          <span>{deleteError}</span>
          <button
            onClick={() => setDeleteError(null)}
            className="alert-close"
          >
            ×
          </button>
        </div>
      )}

      {/* Busca */}
      {filteredCategories.length > 0 && (
        <div className="category-list-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar categorias"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="search-clear"
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Estado: Vazio */}
      {filteredCategories.length === 0 && displayCategories.length === 0 && (
        <div className="category-list-empty">
          <div className="empty-icon">📂</div>
          <h3>Nenhuma categoria ainda</h3>
          <p>Crie sua primeira categoria para começar</p>
          <button
            onClick={handleNewCategory}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Criar Categoria
          </button>
        </div>
      )}

      {/* Estado: Sem resultados na busca */}
      {filteredCategories.length === 0 && displayCategories.length > 0 && (
        <div className="category-list-empty">
          <div className="empty-icon">🔍</div>
          <h3>Nenhum resultado</h3>
          <p>Não encontramos categorias com "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="btn btn-secondary"
          >
            Limpar Busca
          </button>
        </div>
      )}

      {/* Grid de categorias */}
      {filteredCategories.length > 0 && (
        <div className="category-grid">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`category-grid-item ${
                draggedItem?.id === category.id ? 'dragging' : ''
              } ${
                selectable ? 'selectable' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, category)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
              onClick={() => handleSelectCategory(category)}
            >
              {/* Ícone de reordenamento */}
              <div className="category-drag-handle">
                <GripHorizontal size={16} />
              </div>

              {/* Card de categoria */}
              <CategoryCard
                category={category}
                onEdit={handleEditCategory}
                onDelete={() => handleDeleteCategory(category.id)}
                isDeleting={deletingId === category.id}
                isSelectable={selectable}
              />
            </div>
          ))}
        </div>
      )}

      {/* Formulário Modal */}
      {isFormOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
