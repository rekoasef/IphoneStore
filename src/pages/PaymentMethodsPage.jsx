// src/pages/PaymentMethodsPage.jsx
import React from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout';

const PaymentMethodsPage = () => {
  return (
    <StaticPageLayout title="Formas de Pago">
      <p className="mb-4">En iPhone Store te ofrecemos múltiples opciones para que abones tus compras de la manera más cómoda:</p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Efectivo:</strong> Aceptamos Pesos Argentinos (ARS) y Dólares Estadounidenses (USD).</li>
        <li><strong>Transferencias Bancarias:</strong> Podés transferir desde cualquier banco a nuestra cuenta. Te proporcionaremos los datos al momento de la compra.</li>
        <li><strong>Mercado Pago:</strong> Utilizá tu saldo en Mercado Pago o aboná con tarjetas a través de la plataforma.</li>
        <li><strong>Tarjetas de Débito:</strong> Aceptamos las principales tarjetas de débito.</li>
        <li><strong>Tarjetas de Crédito:</strong> Consultanos por planes de financiación y tarjetas aceptadas.</li>
        {/* <li><strong>Criptomonedas:</strong> ¡Consultanos por esta opción! (Opcional, si lo ofrecen)</li> */}
      </ul>
      <p className="mb-4">
        Todos nuestros precios publicados en la web para iPhones suelen estar expresados en Dólares Estadounidenses (USD) como referencia,
        pero podés consultarnos para abonar en Pesos Argentinos (ARS) a la cotización del día.
      </p>
      <p>Si tenés alguna duda sobre las formas de pago, ¡no dudes en <a href={`https://wa.me/3471592234`} target="_blank" rel="noopener noreferrer">contactarnos por WhatsApp</a>!</p>
    </StaticPageLayout>
  );
};
export default PaymentMethodsPage;