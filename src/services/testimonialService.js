// src/services/testimonialService.js
import { collection, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

const testimonialsCollectionRef = collection(db, "testimonials");

/**
 * Obtiene todos los testimonios que han sido aprobados.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de testimonios aprobados.
 */
export const getApprovedTestimonials = async () => {
  try {
    const q = query(
      testimonialsCollectionRef,
      where("status", "==", "approved"),
      orderBy("submittedAt", "desc") // Mostrar los más recientes primero
    );
    const querySnapshot = await getDocs(q);
    const testimonials = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return testimonials;
  } catch (error) {
    console.error("Error al obtener testimonios aprobados: ", error);
    throw error;
  }
};

/**
 * Añade un nuevo testimonio a Firestore.
 * Se guarda con estado 'pending' por defecto.
 * @param {Object} testimonialData - Objeto con { customerName, testimonialText, rating (opcional) }
 * @returns {Promise<DocumentReference>} Una promesa que resuelve a la referencia del documento creado.
 */
export const addTestimonial = async (testimonialData) => {
  try {
    const newTestimonial = {
      ...testimonialData,
      status: "pending", // Los nuevos testimonios requieren aprobación
      submittedAt: serverTimestamp() // Firestore asignará la fecha del servidor
    };
    const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);
    return docRef;
  } catch (error) {
    console.error("Error al añadir testimonio: ", error);
    throw error;
  }
};