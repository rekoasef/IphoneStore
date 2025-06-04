// src/services/productService.js
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const productsCollectionRef = collection(db, "products");

// getAllProducts (para el sitio público, se mantiene con filtro isVisible)
export const getAllProducts = async () => {
  try {
    const q = query(productsCollectionRef, where("isVisible", "==", true), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener productos (público): ", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const docSnap = await getDoc(productDocRef); // La variable es docSnap

    // Aquí estaba el error, debe ser docSnap.exists() y docSnap.data()
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No se encontró el producto con ID:", productId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID: ", error);
    throw error;
  }
};

export const getFeaturedProductsByType = async (productType, count = 3) => {
  try {
    // Asegúrate de que tus productos tengan 'isFeatured', 'type', 'isVisible' y 'createdAt'
    // o ajusta/quita las cláusulas.
    const q = query(
      productsCollectionRef,
      where("isFeatured", "==", true),
      where("type", "==", productType),
      where("isVisible", "==", true),
      orderBy("createdAt", "desc"),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    const featuredProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return featuredProducts;
  } catch (error) {
    console.error(`Error al obtener productos destacados de tipo ${productType}: `, error);
    throw error;
  }
};

// --- NUEVA FUNCIÓN PARA ADMIN ---
/**
 * Obtiene TODOS los productos para el panel de administración, sin filtrar por visibilidad.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de todos los productos.
 */
export const getAllProductsAdmin = async () => {
  try {
    // Ordenamos por fecha de creación para ver los más nuevos primero
    const q = query(productsCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener todos los productos para admin: ", error);
    throw error;
  }
};