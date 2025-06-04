// src/services/testimonialService.js
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,       // <-- Añadir doc
  updateDoc, // <-- Añadir updateDoc
  deleteDoc  // <-- Añadir deleteDoc
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const testimonialsCollectionRef = collection(db, "testimonials");

// (getApprovedTestimonials - sin cambios, se usa en el sitio público)
export const getApprovedTestimonials = async () => {
  try {
    const q = query(
      testimonialsCollectionRef,
      where("status", "==", "approved"),
      orderBy("submittedAt", "desc")
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

// (addTestimonial - sin cambios, se usa en el sitio público)
export const addTestimonial = async (testimonialData) => {
  try {
    const newTestimonial = {
      ...testimonialData,
      status: "pending",
      submittedAt: serverTimestamp()
    };
    const docRef = await addDoc(testimonialsCollectionRef, newTestimonial);
    return docRef;
  } catch (error) {
    console.error("Error al añadir testimonio: ", error);
    throw error;
  }
};

// --- NUEVAS FUNCIONES PARA EL ADMIN ---

/**
 * Obtiene TODOS los testimonios para el panel de administración.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de todos los testimonios.
 */
export const getAllTestimonialsAdmin = async () => {
  try {
    // Ordenamos por fecha de envío para ver los más nuevos (o pendientes) primero
    const q = query(testimonialsCollectionRef, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);
    const testimonials = querySnapshot.docs.map(testDoc => ({ // Cambié doc a testDoc para evitar conflicto con la importación 'doc'
      id: testDoc.id,
      ...testDoc.data()
    }));
    return testimonials;
  } catch (error)
{
    console.error("Error al obtener todos los testimonios para admin: ", error);
    throw error;
  }
};

/**
 * Actualiza el estado de un testimonio.
 * @param {string} testimonialId - El ID del testimonio a actualizar.
 * @param {string} newStatus - El nuevo estado ('approved' o 'rejected').
 * @returns {Promise<void>}
 */
export const updateTestimonialStatus = async (testimonialId, newStatus) => {
  try {
    const testimonialDocRef = doc(db, "testimonials", testimonialId);
    const updateData = { status: newStatus };
    if (newStatus === "approved") {
      updateData.approvedAt = serverTimestamp(); // Marcar fecha de aprobación
    }
    await updateDoc(testimonialDocRef, updateData);
  } catch (error) {
    console.error("Error al actualizar estado del testimonio: ", error);
    throw error;
  }
};

/**
 * Actualiza el contenido de un testimonio.
 * @param {string} testimonialId - El ID del testimonio a actualizar.
 * @param {Object} updatedData - Objeto con los campos a actualizar (customerName, testimonialText, rating).
 * @returns {Promise<void>}
 */
export const updateTestimonialContent = async (testimonialId, updatedData) => {
  try {
    const testimonialDocRef = doc(db, "testimonials", testimonialId);
    // Asegurarse de no enviar campos undefined si no se modifican todos
    const dataToUpdate = {};
    if (updatedData.customerName !== undefined) dataToUpdate.customerName = updatedData.customerName;
    if (updatedData.testimonialText !== undefined) dataToUpdate.testimonialText = updatedData.testimonialText;
    if (updatedData.rating !== undefined) dataToUpdate.rating = updatedData.rating;

    if (Object.keys(dataToUpdate).length > 0) {
       await updateDoc(testimonialDocRef, dataToUpdate);
    }
  } catch (error) {
    console.error("Error al actualizar contenido del testimonio: ", error);
    throw error;
  }
};


/**
 * Elimina un testimonio.
 * @param {string} testimonialId - El ID del testimonio a eliminar.
 * @returns {Promise<void>}
 */
export const deleteTestimonial = async (testimonialId) => {
  try {
    const testimonialDocRef = doc(db, "testimonials", testimonialId);
    await deleteDoc(testimonialDocRef);
  } catch (error) {
    console.error("Error al eliminar testimonio: ", error);
    throw error;
  }
};