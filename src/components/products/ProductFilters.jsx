// src/components/products/ProductFilters.jsx
import React, { useState } from 'react';

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  filters,
  setFilters,
  onApplyFilters,
  onClearFilters // Esta función ya debería limpiar todos los filtros
}) => {
  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

  const iphoneModels = ["Todos", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13"];
  const capacities = ["Todas", "128GB", "256GB", "512GB", "1TB"];
  const conditions = { 'all': 'Todas', 'new': 'Nuevo', 'used': 'Usado' };
  const accessoryTypes = ["Todos", "Fundas", "Cargadores", "Audio", "Protectores"];

  const handleInputChange = (e, filterType) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: {
        ...prevFilters[filterType],
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // No es estrictamente necesario resetear los filtros detallados aquí si el usuario
    // puede querer mantenerlos para la nueva categoría, o sí, para evitar confusión.
    // Lo mantendremos como estaba para que al cambiar categoría principal, se limpien los específicos.
    setFilters({
      iphone: { model: 'Todos', capacity: 'Todas', condition: 'all', priceMin: '', priceMax: '' },
      accessory: { type: 'Todos', compatibility: '' }
    });
  };

  return (
    <div className="mb-10 p-4 sm:p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-light-borde dark:border-dark-borde">
      {/* Sección Siempre Visible: Búsqueda, Categoría Principal y Botón de Despliegue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
        <div className="md:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">Buscar Producto</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Ej: iPhone 14 Pro, Funda..."
            className="w-full p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="category" className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">Categoría Principal</label>
          <select
            id="category"
            name="category"
            className="w-full p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">Todos los Productos</option>
            <option value="iphones">iPhones</option>
            <option value="accessories">Accesorios</option>
          </select>
        </div>
        <div className="md:col-span-1 flex justify-start md:justify-end">
          <button
            onClick={() => setShowDetailedFilters(!showDetailedFilters)}
            className="font-textos flex items-center space-x-2 px-4 py-2.5 rounded-lg border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white transition-colors text-sm w-full md:w-auto"
          >
            <span>{showDetailedFilters ? 'Ocultar' : 'Mostrar'} Filtros Avanzados</span>
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
        {/* El contenido interno no cambia, solo se mueve el div de los botones de acción */}
        {(selectedCategory === 'all' || selectedCategory === 'iphones' || selectedCategory === 'accessories') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Filtros para iPhones */}
            {(selectedCategory === 'all' || selectedCategory === 'iphones') && (
              <div className="space-y-4 p-4 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde">
                <h3 className="text-md font-semibold text-light-text-principal dark:text-dark-text-principal mb-2">Filtros para iPhones</h3>
                {/* Modelo */}
                <div>
                  <label htmlFor="iphoneModel" className="block text-xs font-medium mb-1">Modelo</label>
                  <select id="iphoneModel" name="model" value={filters.iphone.model} onChange={(e) => handleInputChange(e, 'iphone')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-xs">
                    {iphoneModels.map(model => <option key={model} value={model.toLowerCase().replace(/\s+/g, '-')}>{model}</option>)}
                  </select>
                </div>
                {/* Capacidad */}
                <div>
                  <label htmlFor="iphoneCapacity" className="block text-xs font-medium mb-1">Capacidad</label>
                  <select id="iphoneCapacity" name="capacity" value={filters.iphone.capacity} onChange={(e) => handleInputChange(e, 'iphone')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-xs">
                    {capacities.map(cap => <option key={cap} value={cap.toLowerCase()}>{cap}</option>)}
                  </select>
                </div>
                {/* Condición */}
                <div>
                  <label htmlFor="iphoneCondition" className="block text-xs font-medium mb-1">Condición</label>
                  <select id="iphoneCondition" name="condition" value={filters.iphone.condition} onChange={(e) => handleInputChange(e, 'iphone')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-xs">
                    {Object.entries(conditions).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                  </select>
                </div>
                {/* Rango de precios */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="priceMin" className="block text-xs font-medium mb-1">Precio Mín.</label>
                        <input type="number" id="priceMin" name="priceMin" placeholder="USD" value={filters.iphone.priceMin} onChange={(e) => handleInputChange(e, 'iphone')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde text-xs" />
                    </div>
                    <div>
                        <label htmlFor="priceMax" className="block text-xs font-medium mb-1">Precio Máx.</label>
                        <input type="number" id="priceMax" name="priceMax" placeholder="USD" value={filters.iphone.priceMax} onChange={(e) => handleInputChange(e, 'iphone')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde text-xs" />
                    </div>
                </div>
              </div>
            )}
            {/* Filtros para Accesorios */}
            {(selectedCategory === 'all' || selectedCategory === 'accessories') && (
              <div className="space-y-4 p-4 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde">
                <h3 className="text-md font-semibold text-light-text-principal dark:text-dark-text-principal mb-2">Filtros para Accesorios</h3>
                {/* Tipo */}
                <div>
                  <label htmlFor="accessoryType" className="block text-xs font-medium mb-1">Tipo</label>
                  <select id="accessoryType" name="type" value={filters.accessory.type} onChange={(e) => handleInputChange(e, 'accessory')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-xs">
                    {accessoryTypes.map(type => <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>{type}</option>)}
                  </select>
                </div>
                {/* Compatibilidad */}
                <div>
                  <label htmlFor="accessoryCompatibility" className="block text-xs font-medium mb-1">Compatibilidad</label>
                  <input type="text" id="accessoryCompatibility" name="compatibility" placeholder="Ej: iPhone 14 Pro" value={filters.accessory.compatibility} onChange={(e) => handleInputChange(e, 'accessory')} className="w-full p-2 rounded-md border bg-light-bg-secondary dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde text-xs" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botones de Acción (SIEMPRE VISIBLES AHORA) */}
      <div className={`flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 ${showDetailedFilters ? 'mt-6 border-t border-light-borde dark:border-dark-borde pt-6' : 'mt-6'}`}>
        <button
          onClick={onClearFilters} // onClearFilters en CatalogPage ya limpia todo
          className="font-textos px-5 py-2 rounded-lg border-2 border-light-text-secundario dark:border-dark-text-secundario text-light-text-secundario dark:text-dark-text-secundario hover:bg-light-text-secundario dark:hover:bg-dark-text-secundario hover:text-light-bg dark:hover:text-dark-bg transition-colors text-sm"
        >
          Limpiar Filtros {/* Texto general ahora */}
        </button>
        <button
          onClick={onApplyFilters}
          className="font-textos px-5 py-2 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold transition-colors text-sm"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;