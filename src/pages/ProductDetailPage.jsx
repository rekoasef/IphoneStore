// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme para el logo en Navbar (si es necesario aquí, o en Navbar)

// URL de WhatsApp base (reemplaza con el número real o tómalo de una config)
const WHATSAPP_NUMBER = "TUNUMERODEWHATSAPP"; // Ej: +549XXXXXXXXXX

const ProductDetailPage = () => {
  const { productId } = useParams(); // Obtiene el 'productId' de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // Índice de la imagen principal en la galería

  // No es necesario useTheme aquí directamente a menos que se use para algo específico de esta página
  // const { theme } = useTheme(); 

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("ID de producto no válido.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(productId);
        if (productData) {
          setProduct(productData);
        } else {
          setError("Producto no encontrado.");
        }
      } catch (err) {
        console.error("Error en ProductDetailPage al obtener producto:", err);
        setError("Error al cargar el producto. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl text-light-text-secundario dark:text-dark-text-secundario">Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-center px-4">
        <p className="text-xl text-red-500 dark:text-red-400 mb-4">{error}</p>
        <Link to="/catalogo" className="font-textos px-6 py-2.5 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold">
            Volver al Catálogo
        </Link>
      </div>
    );
  }

  if (!product) {
    return ( // Este caso también podría ser manejado por el bloque de error si setError("Producto no disponible") se llama.
        <div className="flex justify-center items-center min-h-[70vh] text-center px-4">
            <p className="text-xl text-light-text-secundario dark:text-dark-text-secundario">Producto no disponible o no encontrado.</p>
            <Link to="/catalogo" className="mt-4 font-textos px-6 py-2.5 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold">
                Volver al Catálogo
            </Link>
        </div>
    );
  }
  
  const whatsappConsultMessage = `Hola! Estoy interesado en el producto: ${product.name} (ID: ${product.id}). ¿Podrían darme más información sobre stock y compra?`;
  const whatsappProductLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappConsultMessage)}`;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Columna de Imágenes (MODIFICADA) */}
        <div className="shadow-xl rounded-lg bg-light-bg-secondary dark:bg-dark-bg-secondary p-3 md:p-4">
          {product.images && product.images.length > 0 ? (
            <>
              {/* Contenedor de la imagen principal con ancho máximo y centrado */}
              <div className="aspect-square w-full max-w-md mx-auto mb-4 rounded-lg overflow-hidden border border-light-borde dark:border-dark-borde">
                <img
                  src={product.images[selectedImage]}
                  alt={`${product.name} - imagen ${selectedImage + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              </div>
              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="flex justify-center space-x-2 overflow-x-auto py-2">
                  {product.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 flex-shrink-0
                                  ${selectedImage === index ? 'border-brand-acento ring-2 ring-brand-acento' : 'border-light-borde dark:border-dark-borde opacity-70 hover:opacity-100'}`}
                    >
                      <img src={imgUrl} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square w-full max-w-md mx-auto bg-light-borde dark:bg-dark-borde rounded-md flex items-center justify-center">
              <p className="text-light-text-secundario dark:text-dark-text-secundario">Sin imagen</p>
            </div>
          )}
        </div>

        {/* Columna de Detalles del Producto */}
        <div className="py-2">
          <h1 className="font-titulos text-3xl lg:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal mb-3">
            {product.name}
          </h1>
          <p className="font-textos text-3xl lg:text-4xl font-bold text-brand-acento mb-6">
            {product.currency || 'USD'} {product.price}
          </p>

          {/* Detalles específicos de iPhone */}
          {product.type && product.type.toLowerCase() === 'iphone' && (
            <div className="mb-6 space-y-2 text-sm font-textos text-light-text-secundario dark:text-dark-text-secundario">
              {product.iphoneModel && <p><strong>Modelo:</strong> {product.iphoneModel}</p>}
              {product.color && <p><strong>Color:</strong> {product.color}</p>}
              {product.storageCapacity && <p><strong>Capacidad:</strong> {product.storageCapacity}</p>}
              {product.condition && <p><strong>Condición:</strong> <span className="capitalize">{product.condition.toLowerCase()}</span></p>}
              {typeof product.batteryHealth === 'number' && <p><strong>Salud de Batería:</strong> {product.batteryHealth}%</p>}
              {product.warranty && <p><strong>Garantía:</strong> {product.warranty}</p>}
            </div>
          )}

          {/* Detalles específicos de Accesorios */}
          {product.type && product.type.toLowerCase() === 'accessory' && (
             <div className="mb-6 space-y-2 text-sm font-textos text-light-text-secundario dark:text-dark-text-secundario">
              {product.category && <p><strong>Categoría:</strong> {product.category}</p>}
              {product.material && <p><strong>Material:</strong> {product.material}</p>}
              {product.accessoryColor && <p><strong>Color del Accesorio:</strong> {product.accessoryColor}</p>}
              {product.accessoryFor && product.accessoryFor.length > 0 && (
                <p><strong>Compatible con:</strong> {product.accessoryFor.join(', ')}</p>
              )}
               {product.compatibility && (!product.accessoryFor || product.accessoryFor.length === 0) && (
                <p><strong>Compatible con:</strong> {product.compatibility}</p>
              )}
            </div>
          )}
          
          {product.description && (
            <div className="mb-6">
              <h2 className="font-titulos text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-2">Descripción</h2>
              <p className="font-textos text-light-text-secundario dark:text-dark-text-secundario whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          {/* Botón de WhatsApp */}
          {product.stock > 0 ? (
            <a
                href={whatsappProductLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-textos w-full sm:w-auto inline-block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-10 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
                Consultar Stock / Comprar
            </a>
          ) : (
            <p className="font-textos text-xl font-semibold text-red-500 dark:text-red-400 bg-light-bg-secondary dark:bg-dark-bg-secondary p-3 rounded-md inline-block">
              Producto Agotado
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;