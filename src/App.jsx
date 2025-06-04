// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
// IMPORTAR NUEVAS PÁGINAS DE INFORMACIÓN
import AboutUsPage from './pages/AboutUsPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import ShippingPage from './pages/ShippingPage';
import WarrantyPage from './pages/WarrantyPage';
import TradeInPage from './pages/TradeInPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          <Route path="/testimonios" element={<TestimonialsPage />} />
          
          {/* NUEVAS RUTAS DE INFORMACIÓN */}
          <Route path="/quienes-somos" element={<AboutUsPage />} />
          <Route path="/formas-de-pago" element={<PaymentMethodsPage />} />
          <Route path="/envios" element={<ShippingPage />} />
          <Route path="/garantias" element={<WarrantyPage />} />
          <Route path="/toma-usados" element={<TradeInPage />} />
          <Route path="/contacto" element={<ContactPage />} /> 

          <Route path="*" element={
            {/* ... (código 404 como antes) ... */}
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;