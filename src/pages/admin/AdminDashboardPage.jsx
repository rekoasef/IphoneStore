// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllProductsAdmin } from '../../services/productService';
import { getAllTestimonialsAdmin } from '../../services/testimonialService';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaCommentDots } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({ productCount: 0, pendingTestimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const products = await getAllProductsAdmin();
        const testimonials = await getAllTestimonialsAdmin();

        const pendingCount = testimonials.filter(t => t.status === 'pending').length;

        setStats({
          productCount: products.length,
          pendingTestimonials: pendingCount,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-titulos text-2xl sm:text-3xl font-bold text-light-text-principal dark:text-dark-text-principal mb-6">
        Dashboard Principal
      </h1>
      {currentUser && (
        <p className="font-textos text-lg text-light-text-secundario dark:text-dark-text-secundario mb-8">
          ¡Bienvenido de nuevo, <span className="font-semibold text-brand-acento">{currentUser.email}</span>!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Productos */}
        <Link to="/admin/productos" className="block p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-light-bg dark:bg-dark-bg">
          <div className="flex items-center">
            <FaMobileAlt className="text-3xl text-brand-acento mr-4" />
            <div>
              <h3 className="font-titulos text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-1">Productos Totales</h3>
              {loading ? (
                <p className="font-textos text-3xl font-bold text-light-text-principal dark:text-dark-text-principal">...</p>
              ) : (
                <p className="font-textos text-3xl font-bold text-light-text-principal dark:text-dark-text-principal">{stats.productCount}</p>
              )}
            </div>
          </div>
        </Link>

        {/* Card de Testimonios */}
        <Link to="/admin/testimonios" className="block p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-light-bg dark:bg-dark-bg">
          <div className="flex items-center">
            <FaCommentDots className="text-3xl text-brand-acento mr-4" />
            <div>
              <h3 className="font-titulos text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-1">Testimonios Pendientes</h3>
              {loading ? (
                 <p className="font-textos text-3xl font-bold text-light-text-principal dark:text-dark-text-principal">...</p>
              ) : (
                <p className={`font-textos text-3xl font-bold ${stats.pendingTestimonials > 0 ? 'text-yellow-500' : 'text-light-text-principal dark:text-dark-text-principal'}`}>
                  {stats.pendingTestimonials}
                </p>
              )}
            </div>
          </div>
        </Link>

        {/* Puedes añadir más cards aquí */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;