// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Asegúrate que la ruta sea correcta
import { ClipLoader } from 'react-spinners';

const ProtectedRoute = () => {
  const { currentUser, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    // Muestra un loader mientras se verifica el estado de autenticación
    return (
      <div className="flex justify-center items-center min-h-screen bg-light-bg dark:bg-dark-bg">
        <ClipLoader color={"#8DA0FF"} loading={loadingAuth} size={50} />
      </div>
    );
  }

  if (!currentUser) {
    // Si no hay usuario y la carga ha terminado, redirige al login.
    // Guarda la ubicación actual para redirigir de vuelta después del login (opcional).
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Si hay un usuario logueado, renderiza el contenido de la ruta solicitada (Outlet para rutas anidadas)
  // o los children si se usa como wrapper de un solo componente.
  // Para nuestro caso de layout de admin con subpáginas, Outlet es lo más común.
  return <Outlet />;
};

export default ProtectedRoute;