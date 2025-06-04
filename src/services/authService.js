// src/services/authService.js
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebaseConfig"; // Importamos la instancia de auth

/**
 * Inicia sesión de un usuario con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
export const logoutUser = () => {
  return signOut(auth);
};

/**
 * Observador del estado de autenticación.
 * Se dispara cuando el usuario inicia o cierra sesión.
 * @param {function} callback - Función que se ejecuta con el objeto user (o null).
 * @returns {Unsubscribe} - Función para desuscribirse del observador.
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};