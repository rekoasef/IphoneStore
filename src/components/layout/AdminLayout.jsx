// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext'; // Para mostrar el email del admin, opcional

const AdminLayout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Opcional: para mostrar info del usuario

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/admin/login'); // Redirigir a login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="min-h-screen flex bg-light-bg-secondary dark:bg-dark-bg-secondary">
      {/* Sidebar de Navegación del Admin */}
      <aside className="w-64 bg-light-bg dark:bg-dark-bg text-light-text-principal dark:text-dark-text-principal p-6 shadow-lg flex flex-col">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="font-titulos text-2xl font-bold text-brand-acento">
            iPhone Store CMS
          </Link>
          {currentUser && (
            <p className="text-xs text-light-text-secundario dark:text-dark-text-secundario mt-1">
              Logueado como: {currentUser.email}
            </p>
          )}
        </div>
        <nav className="flex-grow space-y-3">
          <Link
            to="/admin/dashboard"
            className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/productos" // Crearemos esta ruta más adelante
            className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
          >
            Productos
          </Link>
          <Link
            to="/admin/testimonios" // Crearemos esta ruta más adelante
            className="block py-2.5 px-4 rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
          >
            Testimonios
          </Link>
          {/* Más enlaces del admin aquí */}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full font-textos py-2.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Área de Contenido Principal del Admin */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <Outlet /> {/* Aquí se renderizarán las páginas específicas del admin (Dashboard, Productos, etc.) */}
      </main>
    </div>
  );
};

export default AdminLayout;