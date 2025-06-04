// src/components/common/ThemeToggleButton.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
// Podrías importar íconos de sol y luna aquí si los usas
// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Ejemplo con Heroicons

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-acento transition-colors
                 text-light-text-principal dark:text-dark-text-principal 
                 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
      aria-label="Cambiar tema"
    >
      {theme === 'light' ? (
        // <MoonIcon className="h-6 w-6" /> // Ejemplo con ícono
        <span>🌙 Oscuro</span>
      ) : (
        // <SunIcon className="h-6 w-6" /> // Ejemplo con ícono
        <span>☀️ Claro</span>
      )}
    </button>
  );
};

export default ThemeToggleButton;