// src/pages/AboutUsPage.jsx
import React from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout';

const AboutUsPage = () => {
  return (
    <StaticPageLayout title="Quiénes Somos">
      <p className="mb-4">¡Hola! Somos Facu y Luchi, los apasionados detrás de iPhone Store.</p>
      <p className="mb-4">
        Desde [Año de Inicio], nos hemos dedicado a ofrecer los mejores productos Apple, especialmente iPhones y accesorios,
        a nuestra comunidad en Tortugas, Rosario y alrededores. Creemos firmemente en la calidad, la transparencia y, sobre todo,
        en brindar una atención personalizada que te haga sentir como en casa.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-3">Nuestra Misión</h2>
      <p className="mb-4">
        Nuestra misión es simple: facilitarte el acceso a la tecnología Apple que amas, con la confianza de que estás adquiriendo
        productos originales, con garantía y a precios justos. Queremos ser tu referente número uno cuando pienses en Apple.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-3">¿Por qué elegirnos?</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Atención Personalizada: Siempre estamos dispuestos a asesorarte.</li>
        <li>Garantía Real: En productos nuevos y usados.</li>
        <li>Precios Competitivos: Buscamos ofrecerte lo mejor, al mejor precio.</li>
        <li>Servicio Post-Venta: No desaparecemos después de tu compra.</li>
      </ul>
      <p>¡Gracias por visitarnos y confiar en iPhone Store!</p>
    </StaticPageLayout>
  );
};
export default AboutUsPage;