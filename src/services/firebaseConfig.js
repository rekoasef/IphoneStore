// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics"; // Puedes mantenerlo si quieres usar Analytics

// Tu configuración de Firebase (la que me pasaste)
const firebaseConfig = {
  apiKey: "AIzaSyA3uHGZ2O36OMZFVD49QJK2V2P0Gvp0gvc", // Asegúrate que esta sea la tuya
  authDomain: "iphone-store-catalogo.firebaseapp.com",
  projectId: "iphone-store-catalogo",
  storageBucket: "iphone-store-catalogo.appspot.com", // Corregido: .appspot.com
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
const analytics = getAnalytics(app); // Puedes mantenerlo o quitarlo si no lo usarás activamente

export { db, auth, storage, analytics };