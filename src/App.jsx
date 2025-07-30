// src/App.jsx (VERSIÓN FINAL CON LA ANIMACIÓN CORRECTA)
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import FloatingWhatsAppButton from './components/common/FloatingWhatsAppButton';
import ScrollToTop from './components/common/ScrollToTop';

// Componente de Ruta Protegida
import ProtectedRoute from './components/auth/ProtectedRoute';

// Páginas Públicas
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';
import ShippingPage from './pages/ShippingPage';
import WarrantyPage from './pages/WarrantyPage';
import TradeInPage from './pages/TradeInPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Páginas de Admin
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';

// --- ESTA ES LA CONFIGURACIÓN DE ANIMACIÓN QUE REPLICA TU SITIO ---
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.02,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.3,
};

const PublicSiteLayout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/producto/:productId" element={<ProductDetailPage />} />
              <Route path="/testimonios" element={<TestimonialsPage />} />
              <Route path="/quienes-somos" element={<AboutUsPage />} />
              <Route path="/formas-de-pago" element={<PaymentMethodsPage />} />
              <Route path="/envios" element={<ShippingPage />} />
              <Route path="/garantias" element={<WarrantyPage />} />
              <Route path="/toma-usados" element={<TradeInPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="*" element={
                <div className="container mx-auto text-center py-20 px-4">
                  <h1 className="font-titulos text-4xl md:text-5xl font-bold text-brand-acento mb-4">404</h1>
                  <h2 className="font-titulos text-2xl md:text-3xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-6">Página No Encontrada</h2>
                </div>
              }/>
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicSiteLayout />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="productos" element={<AdminProductsPage />} />
          <Route path="testimonios" element={<AdminTestimonialsPage />} />
          <Route path="productos/nuevo" element={<AdminProductFormPage mode="create" />} />
          <Route path="productos/editar/:productId" element={<AdminProductFormPage mode="edit" />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;