// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { getAllProducts } from '../services/productService'; // <-- IMPORTAR NUESTRO SERVICIO

const initialFiltersState = {
  iphone: { model: 'todos', capacity: 'todas', condition: 'all', priceMin: '', priceMax: '' },
  accessory: { type: 'todos', compatibility: '' }
};

const CatalogPage = () => {
  const [allProducts, setAllProducts] = useState([]); // Todos los productos de Firebase
  const [displayedProducts, setDisplayedProducts] = useState([]); // Productos a mostrar después de filtros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState(initialFiltersState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsFromFirebase = await getAllProducts();
        setAllProducts(productsFromFirebase);
        setDisplayedProducts(productsFromFirebase); // Inicialmente mostramos todos
      } catch (err) {
        console.error("Error en CatalogPage al obtener productos:", err);
        setError("Hubo un error al cargar los productos. Intenta de nuevo más tarde.");
        setAllProducts([]); // Asegurar que sea un array en caso de error
        setDisplayedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez cuando el componente se monta

  const applyFilters = () => {
    console.log("Aplicando filtros:", { searchTerm, selectedCategory, filters });
    let filtered = [...allProducts]; // Empezar con todos los productos cargados

    if (selectedCategory === 'iphones') {
      filtered = filtered.filter(p => p.type && p.type.toLowerCase() === 'iphone');
    } else if (selectedCategory === 'accessories') {
      filtered = filtered.filter(p => p.type && p.type.toLowerCase() === 'accessory');
    }

    if (searchTerm) {
      filtered = filtered.filter(p => p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Lógica de filtros detallados
    const currentIphoneFilters = filters.iphone;
    const currentAccessoryFilters = filters.accessory;

    filtered = filtered.filter(p => {
      if (p.type && p.type.toLowerCase() === 'iphone') {
        if (currentIphoneFilters.model !== 'todos' && p.iphoneModel && p.iphoneModel.toLowerCase().replace(/\s+/g, '-') !== currentIphoneFilters.model) return false;
        if (currentIphoneFilters.capacity !== 'todas' && p.storageCapacity && p.storageCapacity.toLowerCase() !== currentIphoneFilters.capacity) return false;
        if (currentIphoneFilters.condition !== 'all' && p.condition && p.condition.toLowerCase() !== currentIphoneFilters.condition) return false;
        if (currentIphoneFilters.priceMin && p.price < parseFloat(currentIphoneFilters.priceMin)) return false;
        if (currentIphoneFilters.priceMax && p.price > parseFloat(currentIphoneFilters.priceMax)) return false;
      } else if (p.type && p.type.toLowerCase() === 'accessory') {
        if (currentAccessoryFilters.type !== 'todos' && p.category && p.category.toLowerCase().replace(/\s+/g, '-') !== currentAccessoryFilters.type) return false;
        if (currentAccessoryFilters.compatibility && p.accessoryFor && !p.accessoryFor.some(comp => comp.toLowerCase().includes(currentAccessoryFilters.compatibility.toLowerCase()))) {
          // Si tiene un array accessoryFor y NINGUNO incluye el texto de compatibilidad
          if (p.compatibility && !p.compatibility.toLowerCase().includes(currentAccessoryFilters.compatibility.toLowerCase())) {
            // O si tiene un campo compatibility string y no lo incluye
             return false;
          } else if (!p.compatibility) { // Si solo tiene accessoryFor y no compatibility string
            return false;
          }
        } else if (currentAccessoryFilters.compatibility && p.compatibility && !p.compatibility.toLowerCase().includes(currentAccessoryFilters.compatibility.toLowerCase())) {
            // Si tiene un campo compatibility string (no array) y no lo incluye
            return false;
        }

      }
      return true;
    });

    setDisplayedProducts(filtered);
  };

  const clearFilters = () => {
    console.log("Limpiando filtros");
    setSearchTerm('');
    setSelectedCategory('all');
    setFilters(initialFiltersState);
    setDisplayedProducts([...allProducts]); // Mostrar todos los productos de Firebase de nuevo
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-light-text-secundario dark:text-dark-text-secundario">Cargando productos...</p>
        {/* Aquí podrías poner un spinner o animación de carga más elaborada */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
        <p className="text-xl text-red-500 dark:text-red-400 mb-4">{error}</p>
        {/* Podrías añadir un botón para reintentar la carga */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-[70vh]">
      <h1 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
        Nuestro <span className="text-brand-acento">Catálogo</span>
      </h1>

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      {displayedProducts && displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-light-text-secundario dark:text-dark-text-secundario mb-4">
            {allProducts.length > 0 ? "No se encontraron productos que coincidan con tu búsqueda o filtros." : "No hay productos para mostrar en este momento."}
          </p>
          {allProducts.length > 0 && (
            <button
              onClick={clearFilters}
              className="font-textos px-6 py-2.5 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold transition-colors"
            >
              Mostrar Todos los Productos
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;