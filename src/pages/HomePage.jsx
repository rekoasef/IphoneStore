// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedProductsByType } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import { useTheme } from '../contexts/ThemeContext';

const WHATSAPP_URL = "https://wa.me/5493471592234?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta.";
const INSTAGRAM_URL = "https://instagram.com/iphone.store_2";

const HomePage = () => {
  const { theme: currentTheme } = useTheme();
  const [featuredIphones, setFeaturedIphones] = useState([]);
  const [featuredAccessories, setFeaturedAccessories] = useState([]);
  const [loadingIphones, setLoadingIphones] = useState(true);
  const [loadingAccessories, setLoadingAccessories] = useState(true);

  const isologoClaro = '/isologo-claro.png';
  const isologoOscuro = '/isologo-oscuro.png';

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoadingIphones(true);
        const iphones = await getFeaturedProductsByType("iPhone", 5); // Aumentamos a 5 por si quieres mostrar más
        setFeaturedIphones(iphones);
      } catch (error) {
        console.error("Error fetching featured iPhones:", error);
      } finally {
        setLoadingIphones(false);
      }
      try {
        setLoadingAccessories(true);
        const accessories = await getFeaturedProductsByType("Accessory", 5);
        setFeaturedAccessories(accessories);
      } catch (error) {
        console.error("Error fetching featured accessories:", error);
      } finally {
        setLoadingAccessories(false);
      }
    };
    fetchFeatured();
  }, []);

  // --- CONFIGURACIÓN DE ANIMACIONES ---

  // Variante para el contenedor de la Hero Section, orquesta la animación de sus hijos
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1, // Deja 0.2 segundos entre la animación de cada hijo
      },
    },
  };

  // Variante para cada item dentro de la Hero Section (logo, título, etc.)
  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  // Variante para las secciones que aparecen con el scroll
  const sectionOnScrollViewVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex-grow overflow-x-hidden">
      
      {/* 1. Hero Section con animación secuencial */}
      <motion.section 
        className="py-16 md:py-24 text-center bg-light-bg dark:bg-dark-bg"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6">
          <motion.img
            src={currentTheme === 'light' ? isologoOscuro : isologoClaro}
            alt="Isologo iPhone Store"
            className="h-20 md:h-24 mx-auto mb-8"
            variants={heroItemVariants} // Aplica la variante de item
          />
          <motion.h1 
            className="font-titulos text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            variants={heroItemVariants} // Aplica la variante de item
          >
            <span className="text-light-text-principal dark:text-dark-text-principal">Bienvenido a </span>
            <span className="text-brand-acento">iPhone Store</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-light-text-secundario dark:text-dark-text-secundario mb-10 max-w-2xl mx-auto"
            variants={heroItemVariants} // Aplica la variante de item
          >
            Tu experto de confianza en Tortugas, Rosario y alrededores para iPhones y accesorios Apple. Calidad, garantía y los mejores precios, ¡todo en un solo lugar!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={heroItemVariants} // Aplica la variante de item
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-textos bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[220px]">
              Consultar por WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-textos border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[220px]">
              Visita nuestro Instagram
            </a>
          </motion.div>
        </div>
      </motion.section>

      <div className="h-px bg-light-borde dark:bg-dark-borde w-3/4 mx-auto my-8 md:my-12"></div>

      {/* 2. Sección iPhones Destacados con nueva grilla y animación on-scroll */}
      <motion.section
        className="py-12 md:py-16 bg-light-bg-secondary dark:bg-dark-bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionOnScrollViewVariants}
      >
        <div className="container mx-auto px-6">
          <h2 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
            iPhones <span className="text-brand-acento">Destacados</span>
          </h2>
          {loadingIphones ? (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">Cargando iPhones...</p>
          ) : featuredIphones.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredIphones.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">No hay iPhones destacados para mostrar en este momento.</p>
          )}
          <div className="text-center mt-12">
            <Link to="/catalogo" className="font-textos bg-transparent border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </motion.section>

      <div className="h-px bg-light-borde dark:bg-dark-borde w-3/4 mx-auto my-8 md:my-12"></div>
      
      {/* 3. Sección Accesorios Destacados con animación on-scroll */}
      <motion.section
        className="py-12 md:py-16 bg-light-bg dark:bg-dark-bg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionOnScrollViewVariants}
      >
        <div className="container mx-auto px-6">
          <h2 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
            Accesorios <span className="text-brand-acento">Esenciales</span>
          </h2>
          {loadingAccessories ? (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">Cargando accesorios...</p>
          ) : featuredAccessories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredAccessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-light-text-secundario dark:text-dark-text-secundario py-8">No hay accesorios destacados para mostrar en este momento.</p>
          )}
          <div className="text-center mt-12">
            <Link to="/catalogo" className="font-textos bg-transparent border-2 border-brand-acento text-brand-acento hover:bg-brand-acento hover:text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;