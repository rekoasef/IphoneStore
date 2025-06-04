// src/pages/admin/AdminDashboardPage.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext'; 

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1 className="font-titulos text-2xl sm:text-3xl font-bold text-light-text-principal dark:text-dark-text-principal mb-6">
        Dashboard Principal
      </h1>
      {currentUser && (
        <p className="font-textos text-lg text-light-text-secundario dark:text-dark-text-secundario mb-4">
          ¡Bienvenido de nuevo, <span className="font-semibold text-brand-acento">{currentUser.email}</span>!
        </p>
      )}
      <p className="font-textos text-light-text-secundario dark:text-dark-text-secundario">
        Desde aquí podrás gestionar los productos, testimonios y más contenido de iPhone Store.
        Selecciona una opción del menú lateral para comenzar.
      </p>
      {/* Aquí irán resúmenes o estadísticas más adelante */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg shadow-md">
          <h3 className="font-titulos text-xl font-semibold text-brand-acento mb-2">Productos Activos</h3>
          <p className="font-textos text-3xl font-bold text-light-text-principal dark:text-dark-text-principal"> (Próximamente)</p>
        </div>
        <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg shadow-md">
          <h3 className="font-titulos text-xl font-semibold text-brand-acento mb-2">Testimonios Pendientes</h3>
          <p className="font-textos text-3xl font-bold text-light-text-principal dark:text-dark-text-principal"> (Próximamente)</p>
        </div>
        {/* Más cards de resumen */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;