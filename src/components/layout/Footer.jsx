// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const instagramUrl = "https://instagram.com/tuInstagram";
  const whatsappUrl = "https://wa.me/tuNumeroWhatsApp";

  return (
    <footer className="bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-secundario dark:text-dark-text-secundario py-8 mt-auto border-t border-light-borde dark:border-dark-borde">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-acento mx-2 transition-colors">
            Instagram
          </a>
          |
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-acento mx-2 transition-colors">
            WhatsApp
          </a>
        </div>
        <p>&copy; {currentYear} iPhone Store. Todos los derechos reservados.</p>
        <p className="text-xs mt-2">Desarrollado con ❤️ por Facu y Luchi (¡y su AI partner!)</p>
      </div>
    </footer>
  );
};
export default Footer;