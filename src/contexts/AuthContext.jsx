// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange } from '../services/authService';
import { ClipLoader } from 'react-spinners'; // Asegúrate de haber hecho: npm install react-spinners

const AuthContext = createContext(null); // Puedes inicializar con null o un objeto con valores por defecto

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    // Loader simplificado: no depende del tema para evitar la importación conflictiva.
    // Puedes usar ClipLoader con un color fijo o un simple Párrafo.
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-principal dark:text-dark-text-principal">
        {/* Opción 1: Spinner con color fijo (asegúrate que se vea bien en ambos temas) */}
        <ClipLoader color={"#8DA0FF"} loading={loadingAuth} size={50} aria-label="Loading Spinner" />
        <p className="mt-4 text-lg">Verificando autenticación...</p>

        {/* Opción 2: Solo texto (si no quieres usar react-spinners) */}
        {/* <p className="text-xl">Verificando autenticación...</p> */}
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Esto puede pasar si useAuth se usa fuera de AuthProvider.
    // Devolvemos un estado por defecto o lanzamos error.
    // Para el caso del loader inicial de AuthProvider, no debería llegar aquí.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// YA NO NECESITAMOS ESTA LÍNEA, así que si la tienes, elimínala o coméntala:
// import { ThemeContext } from './ThemeContext';