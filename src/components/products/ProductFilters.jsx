// src/components/products/ProductFilters.jsx
import React, { useState } from 'react';

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  filters,
  setFilters,
  onClearFilters
}) => {
  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

  const iphoneModels = ["Todos", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13"];
  const capacities = ["Todas", "128GB", "256GB", "512GB", "1TB"];
  const conditions = { 'all': 'Todas', 'new': 'Nuevo', 'used': 'Usado' };
  const accessoryTypes = ["Todos", "Fundas", "Cargadores", "Audio", "Protectores"];

  const handleInputChange = (e, filterType) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: {
        ...prevFilters[filterType],
        [name]: value
      }
    }));
  };
  
  // Las clases de CSS se mantienen igual
  const inputClasses = "w-full p-2 rounded-md border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-xs";
  const labelClasses = "block text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1";
  
  return (
    <div className="mb-10 p-4 sm:p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-light-borde dark:border-dark-borde">
      {/* Sección Siempre Visible: Búsqueda y Botón de Despliegue */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:flex-grow">
          <label htmlFor="search" className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">
            Buscar en "<span className="capitalize text-brand-acento">{selectedCategory === 'all' ? 'Todo' : selectedCategory}</span>"
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: iPhone 14 Pro, Funda Silicone..."
            className="w-full p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
          />
        </div>
        <div className="w-full sm:w-auto flex-shrink-0">
          <button
            onClick={() => setShowDetailedFilters(!showDetailedFilters)}
            className="font-textos flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white transition-colors text-sm w-full"
          >
            <span>{showDetailedFilters ? 'Ocultar' : 'Mostrar'} Filtros</span>
            <span>{showDetailedFilters ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {/* Sección Desplegable: Filtros Detallados */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showDetailedFilters ? 'max-h-[1000px] opacity-100 mt-6 pt-6 border-t border-light-borde dark:border-dark-borde' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Mostramos filtros de iPhone si la categoría es 'all' o 'iphones' */}
          {(selectedCategory === 'all' || selectedCategory === 'iphones') && (
            <div className="space-y-3 p-4 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde">
              <h3 className="text-md font-semibold text-light-text-principal dark:text-dark-text-principal">Filtros para iPhones</h3>
              <div><label htmlFor="iphoneModel" className={labelClasses}>Modelo</label><select id="iphoneModel" name="model" value={filters.iphone.model} onChange={(e) => handleInputChange(e, 'iphone')} className={inputClasses}>{iphoneModels.map(model => <option key={model} value={model.toLowerCase().replace(/\s+/g, '-')}>{model}</option>)}</select></div>
              <div><label htmlFor="iphoneCapacity" className={labelClasses}>Capacidad</label><select id="iphoneCapacity" name="capacity" value={filters.iphone.capacity} onChange={(e) => handleInputChange(e, 'iphone')} className={inputClasses}>{capacities.map(cap => <option key={cap} value={cap.toLowerCase()}>{cap}</option>)}</select></div>
              <div><label htmlFor="iphoneCondition" className={labelClasses}>Condición</label><select id="iphoneCondition" name="condition" value={filters.iphone.condition} onChange={(e) => handleInputChange(e, 'iphone')} className={inputClasses}>{Object.entries(conditions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></div>
            </div>
          )}

          {/* Mostramos filtros de Accesorios si la categoría es 'all' o 'accessories' */}
          {(selectedCategory === 'all' || selectedCategory === 'accessories') && (
            <div className="space-y-3 p-4 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde">
              <h3 className="text-md font-semibold text-light-text-principal dark:text-dark-text-principal">Filtros para Accesorios</h3>
              <div><label htmlFor="accessoryType" className={labelClasses}>Tipo</label><select id="accessoryType" name="type" value={filters.accessory.type} onChange={(e) => handleInputChange(e, 'accessory')} className={inputClasses}>{accessoryTypes.map(type => <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>{type}</option>)}</select></div>
              <div><label htmlFor="accessoryCompatibility" className={labelClasses}>Compatibilidad</label><input type="text" id="accessoryCompatibility" name="compatibility" value={filters.accessory.compatibility} onChange={(e) => handleInputChange(e, 'accessory')} placeholder="Ej: iPhone 14 Pro" className={inputClasses} /></div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
            <button
              onClick={onClearFilters}
              className="font-textos px-5 py-2 rounded-lg border-2 border-light-text-secundario dark:border-dark-text-secundario text-sm text-light-text-secundario dark:text-dark-text-secundario hover:bg-light-text-secundario dark:hover:bg-dark-text-secundario hover:text-light-bg dark:hover:text-dark-bg transition-colors"
            >
              Limpiar Filtros
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;