// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProductsByType } from '../services/productService'; // Servicio para obtener productos de Firebase
import ProductCard from '../components/products/ProductCard'; // Componente para mostrar cada producto

// URLs de contacto (reemplázalas con las tuyas)
const WHATSAPP_URL = "https://wa.me/TUNUMERODEWHATSAPP?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta.";
const INSTAGRAM_URL = "https://instagram.com/TUPERFILDEINSTAGRAM";

const HomePage = () => {
  const [featuredIphones, setFeaturedIphones] = useState([]);
  const [featuredAccessories, setFeaturedAccessories] = useState([]);
  const [loadingIphones, setLoadingIphones] = useState(true);
  const [loadingAccessories, setLoadingAccessories] = useState(true);
  // Podrías añadir estados de error aquí si quieres manejarlos visualmente

  useEffect(() => {
    const fetchFeatured = async () => {
      // Cargar iPhones destacados
      try {
        setLoadingIphones(true);
        const iphones = await getFeaturedProductsByType("iPhone", 3); // Trae 3 iPhones destacados
        setFeaturedIphones(iphones);
      } catch (error) {
        console.error("Error fetching featured iPhones:", error);
        // Aquí podrías setear un estado de error para iPhones
      } finally {
        setLoadingIphones(false);
      }

      // Cargar Accesorios destacados
      try {
        setLoadingAccessories(true);
        const accessories = await getFeaturedProductsByType("Accessory", 4); // Trae 4 accesorios destacados
        setFeaturedAccessories(accessories);
      } catch (error) {
        console.error("Error fetching featured accessories:", error);
        // Aquí podrías setear un estado de error para Accesorios
      } finally {
        setLoadingAccessories(false);
      }
    };

    fetchFeatured();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez, al montar el componente

  return (
    <div className="flex-grow">
      {/* 1. Hero Section */}
      <section className="py-16 md:py-24 text-center bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <h1 className="font-titulos text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-light-text-principal dark:text-dark-text-principal">Bienvenido a </span>
            <span className="text-brand-acento">iPhone Store</span>
          </h1>
          <p className="text-lg md:text-xl text-light-text-secundario dark:text-dark-text-secundario mb-10 max-w-2xl mx-auto">
            Tu experto de confianza en Tortugas, Rosario y alrededores para iPhones y accesorios Apple. Calidad, garantía y los mejores precios, ¡todo en un solo lugar!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-textos bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[220px]"
            >
              Consultar por WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-textos border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[220px]"
            >
              Visita nuestro Instagram
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-light-borde dark:bg-dark-borde w-3/4 mx-auto my-8 md:my-12"></div>

      {/* 2. Sección iPhones Destacados */}
      <section className="py-12 md:py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
            iPhones <span className="text-brand-acento">Destacados</span>
          </h2>
          {loadingIphones ? (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">Cargando iPhones...</p>
          ) : featuredIphones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredIphones.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">No hay iPhones destacados para mostrar en este momento.</p>
          )}
          <div className="text-center mt-12">
            <Link
              to="/catalogo?category=iphones"
              className="font-textos bg-transparent border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Ver todos los iPhones
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-light-borde dark:bg-dark-borde w-3/4 mx-auto my-8 md:my-12"></div>
      
      {/* 3. Sección Accesorios Destacados */}
      <section className="py-12 md:py-16 bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-6">
          <h2 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
            Accesorios <span className="text-brand-acento">Esenciales</span>
          </h2>
          {loadingAccessories ? (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">Cargando accesorios...</p>
          ) : featuredAccessories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredAccessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">No hay accesorios destacados para mostrar en este momento.</p>
          )}
          <div className="text-center mt-12">
            <Link
              to="/catalogo?category=accessories"
              className="font-textos bg-transparent border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Ver todos los Accesorios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;