// src/pages/TestimonialsPage.jsx
import React, { useEffect, useState } from 'react';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { getApprovedTestimonials } from '../services/testimonialService';
import TestimonialForm from '../components/testimonials/TestimonialForm'; // <-- DESCOMENTAR/AÑADIR IMPORTACIÓN

const TestimonialsPage = () => {
  // ... (estados y useEffect como antes) ...
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFormSuccessMessage, setShowFormSuccessMessage] = useState(false);


  useEffect(() => {
    // ... (fetchTestimonials como antes) ...
     const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const approvedTestimonials = await getApprovedTestimonials();
        setTestimonials(approvedTestimonials);
      } catch (err) {
        console.error("Error en TestimonialsPage al obtener testimonios:", err);
        setError("Hubo un error al cargar los testimonios. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleTestimonialSubmitted = () => {
    setShowFormSuccessMessage(true); // Mostrar mensaje de éxito general
    // Opcionalmente, esconder el mensaje después de unos segundos
    setTimeout(() => {
      setShowFormSuccessMessage(false);
    }, 5000); // Esconde el mensaje después de 5 segundos
    // No necesitamos recargar los testimonios aquí ya que el nuevo está pendiente
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[70vh]">
      {/* ... (Título y sección de testimonios mostrados como antes) ... */}
       <h1 className="font-titulos text-3xl sm:text-4xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-10">
        Lo que Nuestros Clientes <span className="text-brand-acento">Opinan</span>
      </h1>

      {/* ... (loading, error, lista de testimonios como antes) ... */}
       {!loading && !error && testimonials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}


      <div className="mt-12 pt-10 border-t border-light-borde dark:border-dark-borde">
        <h2 className="font-titulos text-2xl sm:text-3xl font-bold text-light-text-principal dark:text-dark-text-principal text-center mb-8">
          Comparte Tu <span className="text-brand-acento">Experiencia</span>
        </h2>
        <div className="max-w-xl mx-auto p-6 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-md">
          {showFormSuccessMessage && (
            <p className="mb-4 text-center text-green-600 dark:text-green-400 p-3 bg-green-100 dark:bg-green-900 rounded-md">
              ¡Gracias! Tu testimonio ha sido enviado y será revisado pronto.
            </p>
          )}
          <TestimonialForm onSubmitted={handleTestimonialSubmitted} /> {/* <-- USAR EL FORMULARIO */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;