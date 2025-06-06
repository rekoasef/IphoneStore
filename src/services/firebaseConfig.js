// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3uHGZ2O36OMZFVD49QJK2V2P0Gvp0gvc", // Tu API Key
  authDomain: "iphone-store-catalogo.firebaseapp.com",
  projectId: "iphone-store-catalogo",
  
  // ESTA ES LA LÍNEA QUE DEBES CAMBIAR:
  storageBucket: "iphone-store-catalogo.firebasestorage.app", // <-- USA EL NOMBRE CORRECTO

  messagingSenderId: "735539905472",
  appId: "1:735539905472:web:077d2a6ff0ab360064be25",
  measurementId: "G-MFG3Y603J2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase y exportarlos
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, auth, storage, analytics };