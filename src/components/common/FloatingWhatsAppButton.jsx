// src/components/common/FloatingWhatsAppButton.jsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = () => {
  const WHATSAPP_URL = "https://wa.me/5493471592234?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta.";

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default FloatingWhatsAppButton; // <-- ESTA ES LA LÍNEA QUE FALTABA