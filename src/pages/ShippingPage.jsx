// src/pages/ShippingPage.jsx
import React from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout'; // Asegúrate que la ruta sea correcta

const ShippingPage = () => {
  const WHATSAPP_NUMBER = "3471592234"; // Reemplaza con tu número real

  return (
    <StaticPageLayout title="Envíos y Entregas">
      {/* Aquí va el contenido que te pasé antes para Envíos */}
      <p className="mb-4">¡Queremos que tengas tu producto Apple lo antes posible!</p>
      <h2 className="text-xl font-semibold mt-6 mb-3">Zonas de Cobertura</h2>
      <p className="mb-4">Realizamos envíos rápidos y seguros principalmente en:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Tortugas</li>
        <li>Rosario (consultar zonas específicas)</li>
        <li>Armstrong, Las Parejas, Montes de Oca, y localidades cercanas.</li>
      </ul>
      <p className="mb-4">Si estás en otra zona, ¡no dudes en consultarnos! Siempre intentamos encontrar una solución.</p>
      <h2 className="text-xl font-semibold mt-6 mb-3">Modalidades de Entrega</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Entrega Coordinada:</strong> Podemos coordinar un punto de encuentro o entrega a domicilio según la zona.</li>
        <li><strong>Envíos por Correo/Mensajería:</strong> Para zonas más alejadas, utilizamos servicios de correo confiables.</li>
      </ul>
      <p className="mb-4">Los costos y tiempos de envío pueden variar según la localidad y el producto. Siempre te informaremos todos los detalles antes de concretar tu compra.</p>
      <p>Para coordinar tu envío, <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-brand-acento hover:underline">contáctanos por WhatsApp</a>.</p>
    </StaticPageLayout>
  );
};

export default ShippingPage;