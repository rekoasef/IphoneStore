// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// URL de WhatsApp base (reemplaza con el número real o tómalo de una config)
const WHATSAPP_NUMBER = "TUNUMERODEWHATSAPP"; // Ej: +549XXXXXXXXXX

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // No renderizar nada si no hay producto
  }

  const {
    id,
    name,
    images,
    price,
    currency = 'USD', // Moneda por defecto
    condition, // Específico para iPhones (ej. "Nuevo Sellado", "Usado - Impecable")
    type, // "iPhone" o "Accessory"
    stock = 0, // Stock numérico
    // Otros campos que podrías querer mostrar brevemente:
    // iphoneModel, storageCapacity, batteryHealth (para iPhones)
    // category (para Accesorios, ej. "Funda", "Cargador")
  } = product;

  const imageUrl = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x300?text=Sin+Imagen';
  const displayPrice = `${currency} ${price}`;
  const isOutOfStock = stock === 0;

  const whatsappConsultMessage = `Hola! Estoy interesado en el producto: ${name}. ¿Podrían darme más información?`;
  const whatsappProductLink = `https://wa.me/<span class="math-inline">\{WHATSAPP\_NUMBER\}?text\=</span>{encodeURIComponent(whatsappConsultMessage)}`;

  return (
    <div className="bg-light-bg dark:bg-dark-bg-secondary rounded-xl shadow-lg overflow-hidden border border-light-borde dark:border-dark-borde flex flex-col h-full transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02]">
      <Link to={`/producto/${id}`} className="block group">
        <div className="w-full h-56 sm:h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-titulos text-lg sm:text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-1 truncate" title={name}>
          {name}
        </h3>

        {type === 'iPhone' && condition && (
          <p className="font-textos text-xs text-light-text-secundario dark:text-dark-text-secundario mb-2 capitalize">
            {condition.toLowerCase()}
          </p>
        )}
        {type === 'Accessory' && product.category && (
           <p className="font-textos text-xs text-light-text-secundario dark:text-dark-text-secundario mb-2 capitalize">
            {product.category.toLowerCase()}
          </p>
        )}

        <p className="font-textos text-xl sm:text-2xl font-bold text-brand-acento mb-3">
          {displayPrice}
        </p>

        <div className="mt-auto space-y-3 pt-3"> {/* Empuja los botones hacia abajo */}
          {isOutOfStock ? (
            <span className="font-textos block w-full text-center bg-red-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm">
              Agotado
            </span>
          ) : (
            <Link
              to={`/producto/${id}`}
              className="font-textos block w-full text-center bg-brand-acento hover:opacity-80 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              Ver Detalles
            </Link>
          )}
          {!isOutOfStock && (
            <a
              href={whatsappProductLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-textos block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              Consultar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;