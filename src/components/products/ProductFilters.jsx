// src/components/products/ProductFilters.jsx (simplificado)
import React from 'react';

const ProductFilters = ({ searchTerm, setSearchTerm, selectedCategory }) => {
  return (
    <div className="mb-10">
      <div className="w-full max-w-xl mx-auto">
        <label htmlFor="search" className="sr-only">
          Buscar productos
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Buscar en ${selectedCategory === 'all' ? 'todo el catálogo' : selectedCategory}...`}
          className="w-full p-3 rounded-lg border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-base"
        />
      </div>
    </div>
  );
};

export default ProductFilters;