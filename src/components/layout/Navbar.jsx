// src/components/layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from '../common/ThemeToggleButton';
import { useTheme } from '../../contexts/ThemeContext.jsx'; // <-- AÑADE ESTA LÍNEA

const Navbar = () => {
  const { theme: currentTheme } = useTheme(); // Ahora useTheme está definido y puedes acceder a 'theme'

  const logoClaro = '/logo-claro.png';
  const logoOscuro = '/logo-oscuro.png';

  return (
    <nav className="bg-light-bg dark:bg-dark-bg shadow-md sticky top-0 z-50 border-b border-light-borde dark:border-dark-borde">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          <img
            src={currentTheme === 'light' ? logoOscuro : logoClaro}
            alt="iPhone Store Logo"
            className="h-10 md:h-12"
          />
        </Link>
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Links de navegación */}
          <Link to="/" className="text-light-text-secundario dark:text-dark-text-secundario hover:text-brand-acento dark:hover:text-brand-acento transition-colors px-2 py-1 rounded-md text-sm md:text-base">Inicio</Link>
          <Link to="/catalogo" className="text-light-text-secundario dark:text-dark-text-secundario hover:text-brand-acento dark:hover:text-brand-acento transition-colors px-2 py-1 rounded-md text-sm md:text-base">Catálogo</Link>
          <Link to="/testimonios" className="text-light-text-secundario dark:text-dark-text-secundario hover:text-brand-acento dark:hover:text-brand-acento transition-colors px-2 py-1 rounded-md text-sm md:text-base">Testimonios</Link>
          <Link to="/contacto" className="text-light-text-secundario dark:text-dark-text-secundario hover:text-brand-acento dark:hover:text-brand-acento transition-colors px-2 py-1 rounded-md text-sm md:text-base">Contacto</Link>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;