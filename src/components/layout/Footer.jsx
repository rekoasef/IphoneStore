// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORTAR Link

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const instagramUrl = "https://instagram.com/iphone.store_2"; // Reemplazar
  const whatsappUrl = "https://wa.me/5493471592234?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta."; // Reemplazar

  const footerLinks = [
    { path: "/quienes-somos", label: "Quiénes Somos" },
    { path: "/formas-de-pago", label: "Formas de Pago" },
    { path: "/envios", label: "Envíos" },
    { path: "/garantias", label: "Garantías" },
    { path: "/toma-usados", label: "Toma de Usados" },
    // { path: "/contacto", label: "Contacto" }, // Cuando creemos la página de contacto
  ];

  return (
    <footer className="bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-secundario dark:text-dark-text-secundario py-10 mt-auto border-t border-light-borde dark:border-dark-borde">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Logo y Redes (Opcional) */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block mb-4">
              {/* Podrías poner el logo aquí si quieres, o solo texto */}
              <h3 className="font-titulos text-xl font-bold text-light-text-principal dark:text-dark-text-principal">
                iPhone <span className="text-brand-acento">Store</span>
              </h3>
            </Link>
            <p className="text-sm mb-3">Tu tienda de confianza para productos Apple.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-acento transition-colors">
                {/* Icono Instagram (ej. de Heroicons o similar) o Texto */} Instagram
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-acento transition-colors">
                {/* Icono WhatsApp o Texto */} WhatsApp
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="text-center md:text-left">
            <h4 className="font-titulos text-lg font-semibold text-light-text-principal dark:text-dark-text-principal mb-3">Información Útil</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-brand-acento transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto Rápido (Opcional) */}
          <div className="text-center md:text-left">
            <h4 className="font-titulos text-lg font-semibold text-light-text-principal dark:text-dark-text-principal mb-3">Contacto Directo</h4>
            <p className="text-sm mb-1">WhatsApp: <a href={whatsappUrl} target="_blank" className="hover:text-brand-acento">Click aqui para contactarnos!</a></p>
            <p className="text-sm">Tortugas, Santa Fe, Argentina</p>
            {/* <p className="text-sm">Email: tuemail@example.com</p> */}
          </div>
        </div>

        <div className="border-t border-light-borde dark:border-dark-borde pt-8 text-center">
          <p className="text-sm">&copy; {currentYear} iPhone Store. Todos los derechos reservados.</p>
          <p className="text-xs mt-2">Desarrollado por Renzo Asef</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;