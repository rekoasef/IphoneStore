// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilitar el modo oscuro basado en clase
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base de la marca (pueden usarse en ambos modos donde aplique)
        'brand-acento': '#8DA0FF',       // Azul claro/lavanda para acentos principales

        // Colores para el Modo Claro (Light Mode)
        'light-bg': '#FFFFFF',          // Fondo principal del modo claro
        'light-bg-secondary': '#F0F0F0',// Fondo secundario o para cards en modo claro
        'light-text-principal': '#02091C', // Texto principal oscuro sobre fondo claro
        'light-text-secundario': '#4A5568',// Texto secundario/grisáceo en modo claro
        'light-borde': '#D1D5DB',       // Color para bordes en modo claro

        // Colores para el Modo Oscuro (Dark Mode)
        'dark-bg': '#02091C',           // Fondo principal oscuro (tu brand-oscuro)
        'dark-bg-secondary': '#111827', // Un poco más claro que el fondo principal para cards
        'dark-text-principal': '#FFFFFF',  // Texto principal blanco/claro sobre fondo oscuro
        'dark-text-secundario': '#B3B3B3',// Texto secundario/gris (tu brand-gris)
        'dark-borde': '#374151',        // Color para bordes en modo oscuro
      },
      fontFamily: {
        'titulos': ['"Diform trial"', 'sans-serif'],
        'textos': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}