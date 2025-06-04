// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Link está importado

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
// Importa otras páginas aquí a medida que las creemos, por ejemplo:
// import TestimonialsPage from './pages/TestimonialsPage';
// import ContactPage from './pages/ContactPage';
// import InfoPage from './pages/InfoPage'; // (Para "Información Útil")

function App() {
  return (
    // El div principal que asegura que el footer quede abajo y aplica el fondo base
    // El fondo se maneja globalmente desde src/index.css (body) usando las variables de tema
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow"> {/* flex-grow permite que esta sección ocupe el espacio vertical disponible */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          
          {/* Rutas para páginas futuras (descomentar e implementar cuando sea el momento) */}
          {/* <Route path="/testimonios" element={<TestimonialsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<InfoPage section="about-us" />} /> 
          <Route path="/pagos" element={<InfoPage section="payment-methods" />} />
          <Route path="/envios" element={<InfoPage section="shipping" />} />
          <Route path="/garantias" element={<InfoPage section="warranties" />} />
          <Route path="/toma-usados" element={<InfoPage section="trade-in" />} />
          */}

          {/* Ruta para manejar páginas no encontradas (404) */}
          <Route path="*" element={
            <div className="container mx-auto text-center py-20 px-4">
              <h1 className="font-titulos text-4xl md:text-5xl font-bold text-brand-acento mb-4">
                404
              </h1>
              <h2 className="font-titulos text-2xl md:text-3xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-6">
                Página No Encontrada
              </h2>
              <p className="text-lg text-light-text-secundario dark:text-dark-text-secundario mb-8">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
              <Link // Link se usa aquí, por eso la importación es necesaria
                to="/"
                className="font-textos inline-block bg-brand-acento hover:opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-opacity duration-300"
              >
                Volver a la Página de Inicio
              </Link>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;