// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = "5493471592234";

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const { id, name, images, price, currency = 'USD', condition, type, stock = 0, category } = product;

  const imageUrl = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x300?text=Sin+Imagen';
  const displayPrice = `${currency} ${price}`;
  const isOutOfStock = stock === 0;

  const whatsappConsultMessage = `Hola! Estoy interesado en el producto: ${name}. ¿Podrían darme más información?`;
  const whatsappProductLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappConsultMessage)}`;

  return (
    <div className="bg-light-bg dark:bg-dark-bg-secondary rounded-xl shadow-lg overflow-hidden border border-light-borde dark:border-dark-borde flex flex-col h-full transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
      <Link to={`/producto/${id}`} className="block group">
        {/* --- SECCIÓN DE IMAGEN MODIFICADA --- */}
        <div className="aspect-square w-full bg-light-bg-secondary dark:bg-dark-bg overflow-hidden group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors">
          <img
            src={imageUrl}
            alt={name}
            // Cambiamos a object-contain y añadimos padding para que "respire"
            className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        {/* --- FIN DE SECCIÓN MODIFICADA --- */}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-titulos text-md sm:text-lg font-semibold text-light-text-principal dark:text-dark-text-principal mb-1 truncate" title={name}>
          {name}
        </h3>

        {(type === 'iPhone' && condition) && (
          <p className="font-textos text-xs text-light-text-secundario dark:text-dark-text-secundario mb-2 capitalize">{condition.toLowerCase()}</p>
        )}
        {(type === 'Accessory' && category) && (
           <p className="font-textos text-xs text-light-text-secundario dark:text-dark-text-secundario mb-2 capitalize">{category.toLowerCase()}</p>
        )}

        <p className="font-textos text-lg sm:text-xl font-bold text-brand-acento mb-3">
          {displayPrice}
        </p>

        <div className="mt-auto space-y-2 pt-2">
          {isOutOfStock ? (
            <span className="font-textos block w-full text-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-semibold py-2 px-3 rounded-lg text-sm">Agotado</span>
          ) : (
            <>
              <Link
                to={`/producto/${id}`}
                className="font-textos block w-full text-center bg-brand-acento hover:opacity-80 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Ver Detalles
              </Link>
              <a
                href={whatsappProductLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-textos block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
              >
                Consultar por WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;