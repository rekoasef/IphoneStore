// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Componentes de Layout
import Navbar from './components/layout/Navbar'; // Para el sitio público
import Footer from './components/layout/Footer';   // Para el sitio público
import AdminLayout from './components/layout/AdminLayout'; // <-- IMPORTAR LAYOUT DEL ADMIN

// Componente de Ruta Protegida
import ProtectedRoute from './components/auth/ProtectedRoute'; // <-- IMPORTAR RUTA PROTEGIDA

// Páginas Públicas
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
// ... (importaciones de otras páginas públicas)
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

function App() {
  return (
    <Routes>
      {/* Rutas Públicas con Navbar y Footer */}
      <Route path="/*" element={ <PublicSiteLayout /> } />

      {/* Rutas de Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}> {/* Elemento wrapper para rutas protegidas */}
        <Route path="/admin" element={<AdminLayout />}> {/* Layout para las rutas de admin anidadas */}
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="productos" element={<AdminProductsPage />} />
          <Route path="testimonios" element={<AdminTestimonialsPage />} />
          <Route path="productos/nuevo" element={<AdminProductFormPage mode="create" />} />
          <Route path="productos/editar/:productId" element={<AdminProductFormPage mode="edit" />} />
          {/* Otras rutas de admin anidadas aquí */}
        </Route>
      </Route>
    </Routes>
  );
}

// Componente para envolver el sitio público y aplicar Navbar/Footer
const PublicSiteLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Routes> {/* Rutas específicas del sitio público */}
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
        <Route path="*" element={ // 404 para el sitio público
          <div className="container mx-auto text-center py-20 px-4">
            <h1 className="font-titulos text-4xl md:text-5xl font-bold text-brand-acento mb-4">404</h1>
            <h2 className="font-titulos text-2xl md:text-3xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-6">Página No Encontrada</h2>
            <p className="text-lg text-light-text-secundario dark:text-dark-text-secundario mb-8">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <Link to="/" className="font-textos inline-block bg-brand-acento hover:opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-opacity duration-300">
              Volver a la Página de Inicio
            </Link>
          </div>
        } />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;