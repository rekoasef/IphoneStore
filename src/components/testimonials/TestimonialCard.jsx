// src/components/testimonials/TestimonialCard.jsx
import React from 'react';

// Un componente simple para mostrar estrellas de rating (opcional)
const StarRating = ({ rating }) => {
  if (typeof rating !== 'number' || rating < 1 || rating > 5) return null;
  return (
    <div className="flex text-yellow-400 mb-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.457a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118l-3.386-2.457a1 1 0 00-1.176 0l-3.387 2.457c-.784.57-1.838-.197-1.539-1.118l1.286-3.973a1 1 0 00-.364-1.118L2.28 8.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { customerName, testimonialText, rating, submittedAt } = testimonial;

  // Formatear la fecha (opcional, podrías usar una librería como date-fns)
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'Fecha no disponible';
    try {
      return timestamp.toDate().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg-secondary p-6 rounded-lg shadow-lg border border-light-borde dark:border-dark-borde h-full flex flex-col">
      {rating && <StarRating rating={rating} />}
      <blockquote className="flex-grow">
        <p className="font-textos text-light-text-principal dark:text-dark-text-principal italic mb-4">
          "{testimonialText}"
        </p>
      </blockquote>
      <footer className="mt-auto pt-4 border-t border-light-borde dark:border-dark-borde">
        <p className="font-titulos text-md font-semibold text-brand-acento">{customerName}</p>
        {submittedAt && (
          <p className="text-xs text-light-text-secundario dark:text-dark-text-secundario">
            {formatDate(submittedAt)}
          </p>
        )}
      </footer>
    </div>
  );
};

export default TestimonialCard;