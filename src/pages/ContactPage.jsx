// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import StaticPageLayout from '../components/layout/StaticPageLayout'; // Reutilizamos el layout

// URLs de contacto (reemplázalas con las tuyas)
const WHATSAPP_URL = "https://wa.me/3471592234?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta.";
const INSTAGRAM_URL = "https://instagram.com/iphone.store_2";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xanjnoja"; // <-- ¡¡REEMPLAZA ESTO!!

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' }); // 'success' o 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: '¡Gracias! Tu mensaje ha sido enviado con éxito.' });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar formulario
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          setSubmitStatus({ type: 'error', message: data.errors.map(err => err.message).join(', ') });
        } else {
          setSubmitStatus({ type: 'error', message: 'Hubo un error al enviar tu mensaje. Intenta de nuevo.' });
        }
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus({ type: 'error', message: 'Hubo un problema de conexión. Intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StaticPageLayout title="Contacto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Columna de Información de Contacto */}
        <div>
          <h2 className="font-titulos text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-4">
            Habla con Nosotros Directamente
          </h2>
          <p className="font-textos text-light-text-secundario dark:text-dark-text-secundario mb-6">
            Si prefieres un contacto más inmediato, no dudes en escribirnos por WhatsApp o visitarnos en Instagram.
            ¡Estamos para ayudarte!
          </p>
          <div className="space-y-4 mb-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde hover:shadow-md transition-shadow"
            >
              {/* Icono WhatsApp (ejemplo, puedes usar SVG o librería) */}
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.719-.981zm.844-2.554l-.225-.124c-.333-.184-.583-.282-.825-.345s-.487-.096-.696-.045c-.207.052-.43.18-.582.346-.153.165-.582.582-.722.733s-.282.225-.525.075c-.243-.15-.999-.45-1.902-.93s-1.516-1.231-1.725-1.515c-.207-.282-.052-.43.075-.581s.184-.207.282-.333c.099-.125.149-.207.225-.345.075-.138.025-.282-.05-.43s-.582-.709-.799-.957c-.217-.249-.45-.282-.6-.282s-.281-.025-.399-.025a.972.972 0 00-.696.315c-.207.225-.696.709-.696 1.575s.052 1.708.225 1.926c.173.218.774.825 1.725 1.282s1.634.722 2.401.844c.845.124 1.337.112 1.737.052s.75-.243 1.001-.709c.25-.465.25-.875.174-1.001s-.075-.207-.15-.282z"/></svg>
              <span>Chatea por WhatsApp</span>
            </a>
             <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-md bg-light-bg dark:bg-dark-bg border border-light-borde dark:border-dark-borde hover:shadow-md transition-shadow"
            >
              {/* Icono Instagram (ejemplo) */}
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>Síguenos en Instagram</span>
            </a>
          </div>
        </div>

        {/* Columna del Formulario */}
        <div>
          <h2 className="font-titulos text-xl font-semibold text-light-text-principal dark:text-dark-text-principal mb-4">
            Envíanos un Mensaje
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1">Nombre Completo</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                     className="w-full p-2.5 rounded-md border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1">Correo Electrónico</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
                     className="w-full p-2.5 rounded-md border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1">Asunto</label>
              <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange}
                     className="w-full p-2.5 rounded-md border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1">Mensaje</label>
              <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required
                        className="w-full p-2.5 rounded-md border bg-light-bg dark:bg-dark-bg border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"></textarea>
            </div>

            {submitStatus.message && (
              <p className={`text-sm p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'}`}>
                {submitStatus.message}
              </p>
            )}

            <div>
              <button type="submit" disabled={isSubmitting}
                      className="w-full font-textos px-6 py-3 rounded-lg bg-brand-acento hover:opacity-80 text-white font-semibold transition-colors disabled:opacity-60">
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default ContactPage;