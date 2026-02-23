'use client';

import { useState, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import './IconPicker.css';

/**
 * 🎨 Seletor de ícones do Lucide React
 * @param {Object} props
 * @param {string} props.value - Ícone selecionado
 * @param {Function} props.onChange - Callback ao mudar
 * @param {Array} props.icons - Lista de nomes de ícones disponíveis
 */
export default function IconPicker({ value, onChange, icons = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState(null);

  /**
   * 🔍 Filtrar ícones por busca
   */
  const filteredIcons = useMemo(() => {
    if (!searchTerm) return icons;
    return icons.filter(icon =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [icons, searchTerm]);

  /**
   * 📄 Renderizar Ícone do Lucide
   */
  const renderIcon = (iconName) => {
    try {
      // Converter kebab-case para PascalCase
      const pascalCase = iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      const IconComponent = LucideIcons[pascalCase];

      if (!IconComponent) {
        console.warn(`❌ Ícone não encontrado: ${pascalCase}`);
        return null;
      }

      return <IconComponent size={24} />;
    } catch (error) {
      console.error(`❌ Erro ao renderizar ícone ${iconName}:`, error);
      return null;
    }
  };

  return (
    <div className="icon-picker-container">
      {/* Busca */}
      <div className="icon-picker-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Buscar ícones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="icon-picker-clear"
            aria-label="Limpar busca"
          >
            ×
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="icon-picker-stats">
        Mostrando {filteredIcons.length} de {icons.length} ícones
      </div>

      {/* Grid de ícones */}
      <div className="icon-picker-grid">
        {filteredIcons.length === 0 ? (
          <div className="icon-picker-empty">
            <p>🔍 Nenhum ícone encontrado</p>
          </div>
        ) : (
          filteredIcons.map((iconName) => {
            const Icon = renderIcon(iconName);
            return (
              <button
                key={iconName}
                type="button"
                onClick={() => onChange(iconName)}
                className={`icon-picker-item ${
                  value === iconName ? 'selected' : ''
                }`}
                onMouseEnter={() => setHoveredIcon(iconName)}
                onMouseLeave={() => setHoveredIcon(null)}
                title={iconName}
              >
                {Icon ? (
                  <>
                    <div className="icon-picker-icon">
                      {Icon}
                    </div>
                    <div className="icon-picker-tooltip">
                      {iconName}
                    </div>
                  </>
                ) : (
                  <div className="icon-picker-error">?
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
