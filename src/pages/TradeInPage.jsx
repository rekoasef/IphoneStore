// src/pages/TradeInPage.jsx
import React from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout'; // Asegúrate que la ruta sea correcta

const TradeInPage = () => {
  const WHATSAPP_NUMBER = "3471592234"; // Reemplaza con tu número real

  return (
    <StaticPageLayout title="Tomamos tu Usado">
    <p className="mb-4">¿Querés renovar tu iPhone? ¡En iPhone Store te lo hacemos fácil!</p>
    <h2 className="text-xl font-semibold mt-6 mb-3">¿Cómo funciona nuestro servicio de Toma de Usados?</h2>
    <p className="mb-4">
        Tomamos tu iPhone usado (y algunos otros dispositivos Apple seleccionados) como parte de pago para que puedas acceder
        a un modelo más nuevo o a ese accesorio que tanto querés.
    </p>
    <p className="mb-4">El proceso es simple:</p>
    <ol className="list-decimal list-inside mb-4 space-y-2">
        <li><strong>Contactanos:</strong> Envianos un mensaje por <a href={`https://wa.me/TUNUMERODEWHATSAPP`} target="_blank" rel="noopener noreferrer">WhatsApp</a> detallando el modelo exacto de tu dispositivo, su estado general (estético y funcional), porcentaje de salud de batería, y si cuenta con caja y accesorios originales.</li>
        <li><strong>Cotización Preliminar:</strong> Con esta información, te daremos una cotización estimada.</li>
        <li><strong>Revisión del Dispositivo:</strong> Si estás de acuerdo, coordinaremos para revisar tu equipo físicamente. Esta revisión es fundamental para confirmar la cotización.</li>
        <li><strong>Oferta Final:</strong> Una vez revisado, te daremos la oferta final por tu usado.</li>
        <li><strong>¡Renovate!:</strong> Si aceptás, el valor de tu usado se descuenta del nuevo producto que quieras adquirir.</li>
    </ol>
    <h2 className="text-xl font-semibold mt-6 mb-3">¿Qué equipos tomamos?</h2>
    <p className="mb-4">Principalmente iPhones en buen estado funcional. Consultanos por otros dispositivos Apple como iPads o Apple Watch.</p>
    <p>¡No esperes más para tener lo último de Apple! <a href={`https://wa.me/TUNUMERODEWHATSAPP`} target="_blank" rel="noopener noreferrer">Consultanos hoy mismo</a>.</p>
    </StaticPageLayout>
  );
};

export default TradeInPage;