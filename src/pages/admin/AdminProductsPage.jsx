// src/pages/admin/AdminProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductsAdmin, deleteProduct } from '../../services/productService';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaPlusCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar productos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/admin/productos/editar/${productId}`);
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"? Esta acción es irreversible.`)) {
      try {
        await deleteProduct(productId);
        // Actualizar el estado para remover el producto de la lista sin recargar la página
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        alert("Producto eliminado con éxito.");
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert(`Error: No se pudo eliminar el producto. ${err.message}`);
      }
    }
  };
  
  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="text-center py-10 flex flex-col items-center justify-center">
      <ClipLoader color={"#8DA0FF"} loading={loading} size={40} aria-label="Loading Spinner" />
      <p className="mt-3 text-light-text-secundario dark:text-dark-text-secundario">Cargando productos...</p>
    </div>
  );
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-titulos text-2xl sm:text-3xl font-bold text-light-text-principal dark:text-dark-text-principal">
          Gestionar Productos
        </h1>
        <Link
          to="/admin/productos/nuevo"
          className="bg-brand-acento hover:opacity-80 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors text-sm"
        >
          <FaPlusCircle />
          <span>Crear Nuevo Producto</span>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 p-2.5 rounded-lg border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm"
        />
      </div>

      <div className="bg-light-bg dark:bg-dark-bg shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-light-borde dark:divide-dark-borde">
          <thead className="bg-light-bg-secondary dark:bg-dark-bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Tipo</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Precio</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Stock</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Visible</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text-secundario dark:text-dark-text-secundario uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-borde dark:divide-dark-borde">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-light-text-principal dark:text-dark-text-principal">{product.name}</div>
                  <div className="text-xs text-light-text-secundario dark:text-dark-text-secundario">{product.category || product.iphoneModel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secundario dark:text-dark-text-secundario capitalize">{product.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-light-text-secundario dark:text-dark-text-secundario">{product.currency || 'USD'} {product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 0 ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' 
                                      : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}>
                    {product.stock > 0 ? product.stock : 'Agotado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex justify-center">
                  {product.isVisible ? <FaEye className="text-green-500" title="Visible" /> : <FaEyeSlash className="text-red-500" title="Oculto" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button onClick={() => handleEdit(product.id)} className="text-blue-500 hover:text-blue-700" title="Editar"><FaEdit size={18}/></button>
                  <button onClick={() => handleDelete(product.id, product.name)} className="text-red-500 hover:text-red-700" title="Eliminar"><FaTrash size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && !loading && (
            <p className="text-center py-8 text-light-text-secundario dark:text-dark-text-secundario">
              No se encontraron productos con los criterios actuales.
            </p>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;