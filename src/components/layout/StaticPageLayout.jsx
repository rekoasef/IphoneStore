// src/components/layout/StaticPageLayout.jsx
import React from 'react';

const StaticPageLayout = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[60vh]">
      <h1 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-8">
        {title}
      </h1>
      <div className="max-w-3xl mx-auto bg-light-bg dark:bg-dark-bg-secondary p-6 sm:p-8 rounded-lg shadow-lg prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-titulos prose-headings:text-brand-acento prose-a:text-brand-acento hover:prose-a:underline">
        {/* 'prose' y 'prose-invert' son clases de Tailwind Typography para estilizar contenido HTML generado o Markdown.
          Asegúrate de instalar y configurar @tailwindcss/typography si quieres usarlo:
          npm install -D @tailwindcss/typography
          Luego añádelo a tus plugins en tailwind.config.js:
          plugins: [require('@tailwindcss/typography')],
          Si no quieres usarlo, puedes quitar estas clases 'prose...' y estilizar manualmente.
        */}
        {children}
      </div>
    </div>
  );
};

export default StaticPageLayout;