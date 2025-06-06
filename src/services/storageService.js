// src/services/storageService.js
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Sube un archivo a Firebase Storage y devuelve la URL de descarga.
 * @param {File} file - El archivo a subir.
 * @param {string} path - La ruta dentro de Storage donde se guardará (ej. 'products/imagen.jpg').
 * @param {function} onProgress - (Opcional) Una función callback para monitorear el progreso de la subida.
 * @returns {Promise<string>} La URL de descarga del archivo.
 */
export const uploadFile = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    // Crear una referencia única para el archivo, incluyendo un timestamp para evitar sobreescrituras
    // ESTA ES LA LÍNEA CORREGIDA:
    const fileName = `${new Date().getTime()}_${file.name}`;
    
    const storageRef = ref(storage, `${path}/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observar eventos de cambio de estado como progreso, pausa y reanudación
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Manejar errores de subida
        console.error("Error al subir archivo:", error);
        reject(error);
      },
      () => {
        // Manejar subida exitosa al completarse
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Archivo disponible en', downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

/**
 * Elimina un archivo de Firebase Storage usando su URL de descarga.
 * @param {string} fileUrl - La URL de descarga completa del archivo a eliminar.
 * @returns {Promise<void>}
 */
export const deleteFileByUrl = async (fileUrl) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    console.log("Archivo eliminado exitosamente:", fileUrl);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.warn("Intento de eliminar un archivo que no existe:", fileUrl);
    } else {
      console.error("Error al eliminar archivo por URL:", error);
      throw error;
    }
  }
};