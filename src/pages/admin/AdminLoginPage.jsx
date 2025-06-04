// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext'; // Para redirigir si ya está logueado

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate('/admin/dashboard'); // Redirigir al dashboard del admin
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Correo electrónico o contraseña incorrectos.');
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Si el admin ya está logueado, redirigir al dashboard
  if (currentUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-light-bg-secondary dark:bg-dark-bg-secondary shadow-2xl rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-titulos font-extrabold text-light-text-principal dark:text-dark-text-principal">
            Panel de Administración
          </h2>
          <p className="mt-2 text-center text-sm text-light-text-secundario dark:text-dark-text-secundario">
            Inicia sesión para continuar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-light-borde dark:border-dark-borde placeholder-light-text-secundario dark:placeholder-dark-text-secundario text-light-text-principal dark:text-dark-text-principal rounded-t-md focus:outline-none focus:ring-brand-acento focus:border-brand-acento focus:z-10 sm:text-sm bg-light-bg dark:bg-dark-bg"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-light-borde dark:border-dark-borde placeholder-light-text-secundario dark:placeholder-dark-text-secundario text-light-text-principal dark:text-dark-text-principal rounded-b-md focus:outline-none focus:ring-brand-acento focus:border-brand-acento focus:z-10 sm:text-sm bg-light-bg dark:bg-dark-bg"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center bg-red-100 dark:bg-red-900 p-2 rounded-md">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-acento hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg focus:ring-brand-acento disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;