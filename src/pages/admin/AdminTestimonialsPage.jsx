// src/pages/admin/AdminTestimonialsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  getAllTestimonialsAdmin,
  updateTestimonialStatus,
  deleteTestimonial,
  updateTestimonialContent
} from '../../services/testimonialService'; // Ajusta la ruta si es necesario
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaHourglassHalf } from 'react-icons/fa'; // Iconos
import { ClipLoader } from 'react-spinners';

// Componente Modal simple para confirmación o edición
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-titulos text-light-text-principal dark:text-dark-text-principal">{title}</h3>
          <button onClick={onClose} className="text-light-text-secundario dark:text-dark-text-secundario hover:text-red-500 text-2xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};


const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', data: null }); // type: 'delete', 'edit'

  // Estados para el formulario de edición
  const [editingTestimonial, setEditingTestimonial] = useState({ id: '', customerName: '', testimonialText: '', rating: 0 });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getAllTestimonialsAdmin();
      setTestimonials(data);
    } catch (err) {
      setError("Error al cargar testimonios.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    if (newStatus === 'rejected' && !window.confirm('¿Estás seguro de que quieres rechazar este testimonio? Esta acción no se puede deshacer fácilmente.')) return;
    try {
      await updateTestimonialStatus(id, newStatus);
      fetchTestimonials(); // Recargar la lista
    } catch (err) {
      alert(`Error al actualizar estado: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    setModalContent({ type: 'delete', data: { id } });
    setIsModalOpen(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteTestimonial(id);
      fetchTestimonials(); // Recargar la lista
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
    closeModal();
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial({ 
      id: testimonial.id, 
      customerName: testimonial.customerName, 
      testimonialText: testimonial.testimonialText, 
      rating: testimonial.rating || 0 
    });
    setModalContent({ type: 'edit', data: testimonial });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setEditingTestimonial(prev => ({ ...prev, rating: newRating }));
  };

  const confirmEdit = async (e) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        customerName: editingTestimonial.customerName,
        testimonialText: editingTestimonial.testimonialText,
      };
      if (editingTestimonial.rating > 0) {
        dataToUpdate.rating = parseInt(editingTestimonial.rating, 10);
      } else {
        dataToUpdate.rating = null; // O Firestore.deleteField() si quieres eliminarlo
      }
      await updateTestimonialContent(editingTestimonial.id, dataToUpdate);
      fetchTestimonials();
    } catch (err) {
      alert(`Error al editar: ${err.message}`);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ type: '', data: null });
  };

  const getStatusColor = (status) => {
    if (status === 'approved') return 'text-green-500';
    if (status === 'pending') return 'text-yellow-500';
    if (status === 'rejected') return 'text-red-500';
    return 'text-gray-500';
  };

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'N/A';
    return timestamp.toDate().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };


  if (loading) return <div className="text-center py-10"><ClipLoader color={"#8DA0FF"} size={40} /><p className="mt-2">Cargando testimonios...</p></div>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div>
      <h1 className="font-titulos text-2xl sm:text-3xl font-bold text-light-text-principal dark:text-dark-text-principal mb-8">
        Gestionar Testimonios
      </h1>

      <div className="bg-light-bg dark:bg-dark-bg shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-light-borde dark:divide-dark-borde">
          <thead className="bg-light-bg-secondary dark:bg-dark-bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Testimonio (extracto)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Rating</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Fecha Envío</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-borde dark:divide-dark-borde">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-light-text-principal dark:text-dark-text-principal">{testimonial.customerName}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-light-text-secundario dark:text-dark-text-secundario max-w-xs truncate">{testimonial.testimonialText}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{testimonial.rating ? `${testimonial.rating} ★` : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secundario dark:text-dark-text-secundario">{formatDate(testimonial.submittedAt)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusColor(testimonial.status)}`}>
                  <span className="capitalize flex items-center">
                    {testimonial.status === 'pending' && <FaHourglassHalf className="mr-1.5" />}
                    {testimonial.status === 'approved' && <FaCheckCircle className="mr-1.5" />}
                    {testimonial.status === 'rejected' && <FaTimesCircle className="mr-1.5" />}
                    {testimonial.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex items-center">
                  {testimonial.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(testimonial.id, 'approved')} className="text-green-500 hover:text-green-700" title="Aprobar"><FaCheckCircle size={18} /></button>
                      <button onClick={() => handleStatusUpdate(testimonial.id, 'rejected')} className="text-red-500 hover:text-red-700" title="Rechazar"><FaTimesCircle size={18} /></button>
                    </>
                  )}
                  {testimonial.status === 'approved' && (
                     <button onClick={() => handleStatusUpdate(testimonial.id, 'pending')} className="text-yellow-500 hover:text-yellow-700" title="Mover a Pendiente"><FaHourglassHalf size={18} /></button>
                  )}
                   {testimonial.status === 'rejected' && (
                     <button onClick={() => handleStatusUpdate(testimonial.id, 'pending')} className="text-yellow-500 hover:text-yellow-700" title="Mover a Pendiente"><FaHourglassHalf size={18} /></button>
                  )}
                  <button onClick={() => openEditModal(testimonial)} className="text-blue-500 hover:text-blue-700" title="Editar"><FaEdit size={18} /></button>
                  <button onClick={() => handleDelete(testimonial.id)} className="text-red-500 hover:text-red-700" title="Eliminar"><FaTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials.length === 0 && !loading && (
            <p className="text-center py-8 text-light-text-secundario dark:text-dark-text-secundario">No hay testimonios para mostrar.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent.type === 'delete' ? 'Confirmar Eliminación' : 'Editar Testimonio'}>
        {modalContent.type === 'delete' && modalContent.data && (
          <div>
            <p className="mb-6 text-light-text-secundario dark:text-dark-text-secundario">¿Estás seguro de que quieres eliminar este testimonio? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={closeModal} className="px-4 py-2 rounded-md border border-light-borde dark:border-dark-borde hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary">Cancelar</button>
              <button onClick={() => confirmDelete(modalContent.data.id)} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">Eliminar</button>
            </div>
          </div>
        )}
        {modalContent.type === 'edit' && editingTestimonial && (
          <form onSubmit={confirmEdit} className="space-y-4">
            <div>
              <label htmlFor="editCustomerName" className="block text-sm font-medium mb-1">Nombre Cliente</label>
              <input type="text" id="editCustomerName" name="customerName" value={editingTestimonial.customerName} onChange={handleEditChange}
                className="w-full p-2.5 rounded-lg border bg-light-bg-secondary dark:bg-dark-bg border-light-borde dark:border-dark-borde text-sm"/>
            </div>
            <div>
              <label htmlFor="editTestimonialText" className="block text-sm font-medium mb-1">Texto Testimonio</label>
              <textarea id="editTestimonialText" name="testimonialText" rows="4" value={editingTestimonial.testimonialText} onChange={handleEditChange}
                className="w-full p-2.5 rounded-lg border bg-light-bg-secondary dark:bg-dark-bg border-light-borde dark:border-dark-borde text-sm"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating (0 para sin rating)</label>
              <input type="number" name="rating" min="0" max="5" value={editingTestimonial.rating} onChange={(e) => handleRatingChange(parseInt(e.target.value,10))} 
                className="w-full p-2.5 rounded-lg border bg-light-bg-secondary dark:bg-dark-bg border-light-borde dark:border-dark-borde text-sm"/>
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border border-light-borde dark:border-dark-borde hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary">Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-brand-acento text-white hover:opacity-80">Guardar Cambios</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminTestimonialsPage;