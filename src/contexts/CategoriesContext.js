'use client';

import { createContext, useState } from 'react';

/**
 * 🌐 Context para categorias
 * Fornece estado global compartilhado entre componentes
 */
export const CategoriesContext = createContext();

/**
 * 🌐 Provider do Context
 */
export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const value = {
    categories,
    setCategories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
