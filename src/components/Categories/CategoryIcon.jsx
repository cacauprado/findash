'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * 🎨 Componente que renderiza ícone dinâmico do Lucide
 * @param {string} iconName - Nome do ícone (ex: "utensils", "home")
 * @param {number} size - Tamanho em pixels (padrão: 24)
 * @param {string} color - Cor do ícone (hex ou rgb)
 * @param {string} className - Classes CSS adicionais
 */
export const CategoryIcon = ({
  iconName = 'tag',
  size = 24,
  color = '#000000',
  className = '',
  ...props
}) => {
  // Converter nome para PascalCase (ex: "shopping-cart" -> "ShoppingCart")
  const IconComponent = LucideIcons[
    iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  ];

  // Fallback se ícone não existir
  if (!IconComponent) {
    console.warn(`⚠️ Ícone não encontrado: ${iconName}`);
    return <LucideIcons.Tag size={size} color={color} className={className} />;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={2}
      className={className}
      {...props}
    />
  );
};

/**
 * Exports nomeados para ícones individuais (opcional)
 */
export const Utensils = (props) => <CategoryIcon iconName="utensils" {...props} />;
export const Car = (props) => <CategoryIcon iconName="car" {...props} />;
export const Home = (props) => <CategoryIcon iconName="home" {...props} />;
export const Heart = (props) => <CategoryIcon iconName="heart" {...props} />;
export const Book = (props) => <CategoryIcon iconName="book" {...props} />;
export const Gamepad2 = (props) => <CategoryIcon iconName="gamepad2" {...props} />;
export const DollarSign = (props) => <CategoryIcon iconName="dollar-sign" {...props} />;
