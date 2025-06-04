// src/components/testimonials/TestimonialForm.jsx
import React, { useState } from 'react';
import { addTestimonial } from '../../services/testimonialService';

const TestimonialForm = ({ onSubmitted }) => {
  const [customerName, setCustomerName] = useState('');
  const [testimonialText, setTestimonialText] = useState('');
  const [rating, setRating] = useState(0); // 0 para "sin calificar"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !testimonialText.trim()) {
      setSubmitError("Por favor, completa tu nombre y el testimonio.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const testimonialData = { customerName, testimonialText };
      if (rating > 0) {
        testimonialData.rating = rating;
      }
      await addTestimonial(testimonialData);
      setSubmitSuccess(true);
      setCustomerName('');
      setTestimonialText('');
      setRating(0);
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (error) {
      console.error("Error al enviar testimonio:", error);
      setSubmitError("Hubo un error al enviar tu testimonio. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente simple para estrellas seleccionables
  const RatingInput = ({ currentRating, onRatingChange }) => {
    return (
      <div className="flex items-center space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onRatingChange(star)}
            className={`text-2xl transition-colors duration-150 
                       ${star <= currentRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'}`}
            aria-label={`Calificar con ${star} estrellas`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">
          Tu Nombre
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="testimonialText" className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">
          Tu Testimonio
        </label>
        <textarea
          id="testimonialText"
          rows="4"
          value={testimonialText}
          onChange={(e) => setTestimonialText(e.target.value)}
          className="w-full p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-light-text-principal dark:text-dark-text-principal mb-1">
          Calificación (Opcional)
        </label>
        <RatingInput currentRating={rating} onRatingChange={setRating} />
      </div>

      {submitSuccess && (
        <p className="text-green-600 dark:text-green-400 text-sm">
          ¡Gracias! Tu testimonio ha sido enviado y será revisado pronto.
        </p>
      )}
      {submitError && (
        <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-textos px-6 py-3 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Testimonio'}
      </button>
    </form>
  );
};

export default TestimonialForm;