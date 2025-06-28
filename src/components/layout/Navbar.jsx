// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggleButton from '../common/ThemeToggleButton';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { theme: currentTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const logoClaro = '/logo-claro.png';
  const logoOscuro = '/logo-oscuro.png';

  // Efecto para cerrar el menú si el usuario cambia de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Clases de Estilo ---

  // Clases para los enlaces en el menú de escritorio
  const desktopLinkClasses = "text-light-text-secundario dark:text-dark-text-secundario hover:text-brand-acento dark:hover:text-brand-acento transition-colors px-2 py-1 rounded-md text-sm md:text-base";
  
  // Clases para los enlaces en el menú móvil (CORREGIDO)
  // El error estaba en `dark:text-light-text-principal`, debía ser `dark:text-dark-text-principal`
  const mobileLinkClasses = "text-light-text-principal dark:text-dark-text-principal text-2xl font-titulos block text-center py-4 hover:text-brand-acento transition-colors";

  // Componente interno para los links, para no repetir código y mantenerlo limpio
  const NavLinks = ({ isMobile = false }) => (
    <>
      <Link to="/" className={isMobile ? mobileLinkClasses : desktopLinkClasses}>Inicio</Link>
      <Link to="/catalogo" className={isMobile ? mobileLinkClasses : desktopLinkClasses}>Catálogo</Link>
      <Link to="/testimonios" className={isMobile ? mobileLinkClasses : desktopLinkClasses}>Testimonios</Link>
      <Link to="/contacto" className={isMobile ? mobileLinkClasses : desktopLinkClasses}>Contacto</Link>
      <div className={isMobile ? 'pt-4' : ''}>
        <ThemeToggleButton />
      </div>
    </>
  );

  return (
    <nav className="bg-light-bg dark:bg-dark-bg shadow-md sticky top-0 z-50 border-b border-light-borde dark:border-dark-borde">
      {/* El contenedor principal ahora es relativo para posicionar elementos dentro de él */}
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center h-16 relative">

        {/* --- Versión de Escritorio (md y superior) --- */}
        <div className="hidden md:flex w-full justify-between items-center">
          {/* Logo a la izquierda */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img
              src={currentTheme === 'light' ? logoOscuro : logoClaro}
              alt="iPhone Store Logo"
              className="h-10 md:h-12"
            />
          </Link>
          {/* Links a la derecha */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <NavLinks />
          </div>
        </div>

        {/* --- Versión Móvil (hasta md) --- */}
        <div className="md:hidden w-full flex justify-center items-center">
          {/* Logo centrado */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img
              src={currentTheme === 'light' ? logoOscuro : logoClaro}
              alt="iPhone Store Logo"
              className="h-10"
            />
          </Link>

          {/* Botón de Menú Hamburguesa (posicionado absolutamente a la derecha) */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <button onClick={toggleMenu} className="text-2xl text-light-text-principal dark:text-dark-text-principal" aria-label="Abrir menú">
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* --- Panel del Menú Móvil Desplegable --- */}
      {/* Se añade una transición de opacidad para que aparezca más suavemente */}
      {isMenuOpen && (
        <div 
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center transition-opacity duration-300"
        >
          {/* Botón para cerrar el menú */}
          <button onClick={toggleMenu} className="absolute top-5 right-5 text-3xl text-light-text-principal dark:text-dark-text-principal" aria-label="Cerrar menú">
            <FaTimes />
          </button>
          
          <div className="flex flex-col items-center">
            <NavLinks isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;