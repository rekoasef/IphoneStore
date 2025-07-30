// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters'; // Usará la versión simplificada
import { getAllProducts } from '../services/productService';
import { ClipLoader } from 'react-spinners';

const CatalogPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros simplificados
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'iphones', 'accessories'

  // Carga inicial de productos desde Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsFromFirebase = await getAllProducts();
        setAllProducts(productsFromFirebase);
      } catch (err) {
        console.error("Error en CatalogPage al obtener productos:", err);
        setError("Hubo un error al cargar los productos. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Efecto para filtrar productos automáticamente cuando cambie cualquier criterio
  useEffect(() => {
    let filtered = [...allProducts];

    // 1. Filtrar por Pestaña de Categoría
    if (selectedCategory === 'iphones') {
      filtered = filtered.filter(p => p.type?.toLowerCase() === 'iphone');
    } else if (selectedCategory === 'accessories') {
      filtered = filtered.filter(p => p.type?.toLowerCase() === 'accessory');
    }

    // 2. Filtrar por término de búsqueda
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  // Componente interno para los botones de las pestañas
  const TabButton = ({ category, label }) => {
    const isActive = selectedCategory === category;
    return (
      <button
        onClick={() => setSelectedCategory(category)}
        className={`font-titulos px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg focus:ring-brand-acento
                   ${isActive 
                      ? 'bg-brand-acento text-white shadow-lg' 
                      : 'bg-light-bg dark:bg-dark-bg-secondary text-light-text-secundario dark:text-dark-text-secundario hover:bg-light-bg-secondary dark:hover:bg-dark-bg'
                   }`}
      >
        {label}
      </button>
    );
  };

  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-6">
        Nuestro <span className="text-brand-acento">Catálogo</span>
      </h1>

      {/* PESTAÑAS DE CATEGORÍA */}
      <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-8">
        <TabButton category="all" label="Todos" />
        <TabButton category="iphones" label="iPhones" />
        <TabButton category="accessories" label="Accesorios" />
      </div>

      {/* El componente de filtros ahora se simplifica */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
      />

      {loading ? (
        <div className="text-center py-10 flex flex-col items-center justify-center">
          <ClipLoader color={"#8DA0FF"} size={40} />
          <p className="mt-3 text-light-text-secundario dark:text-dark-text-secundario">Cargando productos...</p>
        </div>
      ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-light-text-secundario dark:text-dark-text-secundario mb-4">
            No se encontraron productos con los criterios actuales.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}
            className="font-textos px-6 py-2.5 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold transition-colors"
          >
            Ver Todos los Productos
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;