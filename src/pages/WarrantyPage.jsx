
import React from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout'; // Asegúrate que la ruta sea correcta

const WarrantyPage = () => {
  const WHATSAPP_NUMBER = "3471592234"; // Reemplaza con tu número real

  return (
    <StaticPageLayout title="Nuestra Política de Garantía">
    <p className="mb-4">En iPhone Store, tu tranquilidad es nuestra prioridad. Por eso, todos nuestros productos cuentan con garantía.</p>
    <h2 className="text-xl font-semibold mt-6 mb-3">Productos Nuevos Sellados</h2>
    <p className="mb-4">
        Los iPhones y productos Apple nuevos y sellados cuentan con <strong>12 meses de garantía oficial de Apple</strong> a nivel internacional.
        Podés gestionarla en cualquier servicio técnico autorizado por Apple.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-3">Productos Usados Seleccionados</h2>
    <p className="mb-4">
        Nuestros iPhones usados son cuidadosamente seleccionados y testeados para asegurar su óptimo funcionamiento.
        Ofrecemos una <strong>garantía propia de 3 meses</strong> que cubre cualquier desperfecto de fábrica no ocasionado por mal uso, golpes o humedad.
        La batería de los equipos usados no está cubierta por la garantía, aunque siempre nos aseguramos de que tengan un buen porcentaje de salud al momento de la venta.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-3">Accesorios</h2>
    <p className="mb-4">
        Los accesorios originales cuentan con la garantía del fabricante. Los accesorios genéricos o alternativos tienen una garantía de 30 días por fallas de fabricación.
    </p>
    <p className="mb-4">Para cualquier consulta sobre garantías, o si necesitás hacer uso de ella, por favor <a href={`https://wa.me/TUNUMERODEWHATSAPP`} target="_blank" rel="noopener noreferrer">contáctanos</a>.</p>
    </StaticPageLayout>
  );
};

export default WarrantyPage;