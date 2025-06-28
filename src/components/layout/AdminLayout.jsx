// src/components/layout/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importamos íconos

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para cerrar el menú al navegar
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el menú móvil

  // Cierra el sidebar cada vez que se cambia de página en móvil
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/admin/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Contenido del Sidebar, para no repetirlo
  const sidebarContent = (
    <>
      <div className="mb-8">
        <Link to="/admin/dashboard" className="font-titulos text-2xl font-bold text-brand-acento">
          iPhone Store CMS
        </Link>
        {currentUser && (
          <p className="text-xs text-light-text-secundario dark:text-dark-text-secundario mt-1 break-all">
            Logueado: {currentUser.email}
          </p>
        )}
      </div>
      <nav className="flex-grow space-y-3">
        <Link to="/admin/dashboard" className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">Dashboard</Link>
        <Link to="/admin/productos" className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">Productos</Link>
        <Link to="/admin/testimonios" className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">Testimonios</Link>
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="w-full font-textos py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors">
          Cerrar Sesión
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-light-bg-secondary dark:bg-dark-bg-secondary">
      {/* --- Sidebar para Escritorio (Fijo) --- */}
      <aside className="w-64 bg-light-bg dark:bg-dark-bg text-light-text-principal dark:text-dark-text-principal p-6 shadow-lg flex-col hidden md:flex">
        {sidebarContent}
      </aside>

      {/* --- Sidebar para Móvil (Desplegable) --- */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Overlay oscuro */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
          {/* Contenido del Sidebar */}
          <aside className="w-64 bg-light-bg dark:bg-dark-bg text-light-text-principal dark:text-dark-text-principal p-6 shadow-lg flex flex-col z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* --- Área de Contenido Principal --- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Botón de Hamburguesa para Móvil */}
        <button onClick={toggleSidebar} className="md:hidden mb-4 text-2xl text-light-text-principal dark:text-dark-text-principal">
          <FaBars />
        </button>
        <Outlet /> {/* Aquí se renderiza el contenido de cada página del admin */}
      </main>
    </div>
  );
};

export default AdminLayout;