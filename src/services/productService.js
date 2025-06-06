// src/services/productService.js
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { deleteFileByUrl } from "./storageService";

// Referencia a la colección 'products' en Firestore
const productsCollectionRef = collection(db, "products");

/**
 * Obtiene productos para el sitio público (solo los visibles).
 */
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

/**
 * Obtiene un producto específico por su ID.
 */
export const getProductById = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const docSnap = await getDoc(productDocRef);

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

/**
 * Obtiene productos destacados de un tipo específico para la página de inicio.
 */
export const getFeaturedProductsByType = async (productType, count = 3) => {
  try {
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


// --- FUNCIONES PARA EL PANEL DE ADMINISTRACIÓN ---

/**
 * Obtiene TODOS los productos para el panel de administración.
 */
export const getAllProductsAdmin = async () => {
  try {
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

/**
 * Añade un nuevo producto a Firestore.
 */
export const addProduct = async (productData) => {
  try {
    const newProduct = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(productsCollectionRef, newProduct);
    return docRef;
  } catch (error) {
    console.error("Error al añadir producto: ", error);
    throw error;
  }
};

/**
 * Actualiza un producto existente en Firestore.
 */
export const updateProduct = async (productId, productData) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const updatedProduct = {
      ...productData,
      updatedAt: serverTimestamp()
    };
    await updateDoc(productDocRef, updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto: ", error);
    throw error;
  }
};

/**
 * Elimina un producto de Firestore y todas sus imágenes de Storage.
 * @param {string} productId - El ID del producto a eliminar.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  try {
    // 1. Obtener los datos del producto para saber qué imágenes borrar
    const productDocRef = doc(db, "products", productId);
    const productSnap = await getDoc(productDocRef);

    if (!productSnap.exists()) {
      throw new Error("El producto que intentas eliminar no existe.");
    }

    const productData = productSnap.data();
    const imageUrls = productData.images || [];

    // 2. Eliminar todas las imágenes asociadas de Firebase Storage
    if (imageUrls.length > 0) {
      console.log(`Eliminando ${imageUrls.length} imágenes de Storage...`);
      // Creamos una promesa para cada eliminación y esperamos que todas terminen
      const deletePromises = imageUrls.map(url => deleteFileByUrl(url));
      await Promise.all(deletePromises);
      console.log("Imágenes eliminadas correctamente.");
    }

    // 3. Una vez eliminadas las imágenes, eliminar el documento de Firestore
    await deleteDoc(productDocRef);
    console.log("Documento del producto eliminado de Firestore.");

  } catch (error) {
    console.error("Error al eliminar el producto y sus imágenes: ", error);
    throw error;
  }
};