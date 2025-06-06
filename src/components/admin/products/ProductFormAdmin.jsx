// src/components/admin/products/ProductFormAdmin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProductById, updateProduct } from '../../../services/productService';
import { uploadFile, deleteFileByUrl } from '../../../services/storageService';
import { ClipLoader } from 'react-spinners';
import { FaTrash, FaPlus } from 'react-icons/fa';

const initialState = {
  name: '', description: '', type: 'iPhone', category: '', price: '', currency: 'USD',
  stock: 0, images: [], isFeatured: false, isVisible: true, iphoneModel: '', color: '',
  storageCapacity: '', batteryHealth: '', condition: 'Nuevo Sellado', warranty: '',
  accessoryFor: '', material: '', accessoryColor: '',
};

const iphoneConditions = ["Nuevo Sellado", "Usado - Impecable", "Usado - Como Nuevo", "Usado - Buen Estado"];

const ProductFormAdmin = ({ mode = 'create' }) => {
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();

  // Estados para la gestión de imágenes
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    if (mode === 'edit' && productId) {
      setLoading(true);
      getProductById(productId)
        .then(data => {
          if (data) {
            const editData = { ...initialState, ...data };
            if (Array.isArray(editData.accessoryFor)) {
              editData.accessoryFor = editData.accessoryFor.join(', ');
            }
            setProduct(editData);
            setExistingImageUrls(data.images || []);
          } else {
            setFormError('Producto no encontrado para editar.');
          }
        })
        .catch(err => {
          console.error(err);
          setFormError('Error al cargar datos del producto.');
        })
        .finally(() => setLoading(false));
    } else {
      setProduct(initialState);
      setExistingImageUrls([]);
    }
  }, [mode, productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (e.target.type === 'number' ? parseFloat(value) || '' : value)
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setNewImageFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeNewImage = (indexToRemove) => {
    setNewImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const markImageForDeletion = (urlToDelete) => {
    setExistingImageUrls(prevUrls => prevUrls.filter(url => url !== urlToDelete));
    setImagesToDelete(prevUrls => [...prevUrls, urlToDelete]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      if (imagesToDelete.length > 0) {
        await Promise.all(imagesToDelete.map(url => deleteFileByUrl(url)));
      }

      const uploadedImageUrls = await Promise.all(
        newImageFiles.map(file => {
          const path = `products/${productId || 'new_product'}`;
          return uploadFile(file, path, (progress) => {
            setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
          });
        })
      );
      
      const finalImageUrls = [...existingImageUrls, ...uploadedImageUrls];

      let finalProductData = {
        name: product.name,
        description: product.description,
        type: product.type,
        category: product.category,
        price: parseFloat(product.price) || 0,
        currency: product.currency,
        stock: parseInt(product.stock, 10) || 0,
        images: finalImageUrls,
        isFeatured: product.isFeatured,
        isVisible: product.isVisible,
      };

      if (product.type === 'iPhone') {
        finalProductData = {
          ...finalProductData,
          iphoneModel: product.iphoneModel,
          color: product.color,
          storageCapacity: product.storageCapacity,
          batteryHealth: product.batteryHealth ? parseInt(product.batteryHealth, 10) : null,
          condition: product.condition,
          warranty: product.warranty,
        };
      } else if (product.type === 'Accessory') {
        finalProductData = {
          ...finalProductData,
          accessoryFor: product.accessoryFor ? product.accessoryFor.split(',').map(item => item.trim()).filter(item => item) : [],
          material: product.material,
          accessoryColor: product.accessoryColor,
        };
      }

      if (mode === 'create') {
        await addProduct(finalProductData);
        setFormSuccess('¡Producto creado con éxito!');
        setTimeout(() => navigate('/admin/productos'), 1500);
      } else if (mode === 'edit' && productId) {
        await updateProduct(productId, finalProductData);
        setFormSuccess('¡Producto actualizado con éxito!');
        setTimeout(() => navigate('/admin/productos'), 1500);
      }
    } catch (err) {
      console.error("Error al guardar producto:", err);
      setFormError(`Error al guardar: ${err.message}`);
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  const inputClasses = "w-full p-2 rounded-md border bg-light-bg dark:bg-dark-bg-secondary border-light-borde dark:border-dark-borde focus:ring-brand-acento focus:border-brand-acento text-sm";
  const labelClasses = "block text-sm font-medium text-light-text-secundario dark:text-dark-text-secundario mb-1";
  
  if (loading && mode === 'edit') return <div className="text-center py-10"><ClipLoader color={"#8DA0FF"} size={30} /><p className="mt-2">Cargando producto...</p></div>;

  return (
    <div className="max-w-4xl mx-auto bg-light-bg dark:bg-dark-bg p-6 sm:p-8 rounded-lg shadow-xl border border-light-borde dark:border-dark-borde">
      <h2 className="font-titulos text-2xl font-bold text-light-text-principal dark:text-dark-text-principal mb-6 text-center">
        {mode === 'create' ? 'Crear Nuevo Producto' : 'Editar Producto'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- Bloque de Campos Comunes --- */}
        <div className="space-y-4">
          <div><label htmlFor="name" className={labelClasses}>Nombre del Producto</label><input type="text" name="name" id="name" value={product.name || ''} onChange={handleChange} required className={inputClasses} /></div>
          <div><label htmlFor="description" className={labelClasses}>Descripción</label><textarea name="description" id="description" rows="4" value={product.description || ''} onChange={handleChange} className={inputClasses}></textarea></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label htmlFor="type" className={labelClasses}>Tipo de Producto</label><select name="type" id="type" value={product.type} onChange={handleChange} className={inputClasses}><option value="iPhone">iPhone</option><option value="Accessory">Accessory</option></select></div>
            <div><label htmlFor="category" className={labelClasses}>Categoría (Ej: Smartphones, Fundas)</label><input type="text" name="category" id="category" value={product.category || ''} onChange={handleChange} className={inputClasses} /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div><label htmlFor="price" className={labelClasses}>Precio</label><input type="number" name="price" id="price" step="0.01" value={product.price || ''} onChange={handleChange} required className={inputClasses} /></div>
            <div><label htmlFor="currency" className={labelClasses}>Moneda</label><select name="currency" id="currency" value={product.currency} onChange={handleChange} className={inputClasses}><option value="USD">USD</option><option value="ARS">ARS</option></select></div>
            <div><label htmlFor="stock" className={labelClasses}>Stock</label><input type="number" name="stock" id="stock" value={product.stock || 0} onChange={handleChange} required className={inputClasses} /></div>
          </div>
          <div className="flex items-center space-x-6 mt-2">
            <div className="flex items-center"><input type="checkbox" name="isFeatured" id="isFeatured" checked={product.isFeatured} onChange={handleChange} className="h-4 w-4 text-brand-acento focus:ring-brand-acento border-gray-300 rounded" /><label htmlFor="isFeatured" className="ml-2 block text-sm text-light-text-secundario dark:text-dark-text-secundario">¿Producto Destacado?</label></div>
            <div className="flex items-center"><input type="checkbox" name="isVisible" id="isVisible" checked={product.isVisible} onChange={handleChange} className="h-4 w-4 text-brand-acento focus:ring-brand-acento border-gray-300 rounded" /><label htmlFor="isVisible" className="ml-2 block text-sm text-light-text-secundario dark:text-dark-text-secundario">¿Visible en Tienda?</label></div>
          </div>
        </div>

        {/* --- Bloque de Campos para iPhone (Condicional) --- */}
        {product.type === 'iPhone' && (
          <div className="mt-6 pt-6 border-t border-light-borde dark:border-dark-borde space-y-4">
            <h3 className="text-lg font-semibold text-light-text-principal dark:text-dark-text-principal">Detalles iPhone</h3>
            <div><label htmlFor="iphoneModel" className={labelClasses}>Modelo iPhone</label><input type="text" name="iphoneModel" id="iphoneModel" value={product.iphoneModel || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="color" className={labelClasses}>Color</label><input type="text" name="color" id="color" value={product.color || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="storageCapacity" className={labelClasses}>Capacidad Almacenamiento</label><input type="text" name="storageCapacity" id="storageCapacity" value={product.storageCapacity || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="batteryHealth" className={labelClasses}>% Batería (si es usado)</label><input type="number" name="batteryHealth" id="batteryHealth" value={product.batteryHealth || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="condition" className={labelClasses}>Condición</label><select name="condition" id="condition" value={product.condition} onChange={handleChange} className={inputClasses}>{iphoneConditions.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label htmlFor="warranty" className={labelClasses}>Garantía</label><input type="text" name="warranty" id="warranty" value={product.warranty || ''} onChange={handleChange} className={inputClasses}/></div>
          </div>
        )}

        {/* --- Bloque de Campos para Accesorios (Condicional) --- */}
        {product.type === 'Accessory' && (
          <div className="mt-6 pt-6 border-t border-light-borde dark:border-dark-borde space-y-4">
            <h3 className="text-lg font-semibold text-light-text-principal dark:text-dark-text-principal">Detalles Accesorio</h3>
            <div><label htmlFor="accessoryFor" className={labelClasses}>Compatible con (modelos separados por coma)</label><input type="text" id="accessoryFor" name="accessoryFor" value={product.accessoryFor || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="material" className={labelClasses}>Material</label><input type="text" name="material" id="material" value={product.material || ''} onChange={handleChange} className={inputClasses}/></div>
            <div><label htmlFor="accessoryColor" className={labelClasses}>Color del Accesorio</label><input type="text" name="accessoryColor" id="accessoryColor" value={product.accessoryColor || ''} onChange={handleChange} className={inputClasses}/></div>
          </div>
        )}

        {/* --- Bloque de Gestión de Imágenes --- */}
        <div className="mt-6 pt-6 border-t border-light-borde dark:border-dark-borde">
          <h3 className="text-lg font-semibold text-light-text-principal dark:text-dark-text-principal mb-2">Imágenes del Producto</h3>
          {existingImageUrls.length > 0 && (
            <div className="mb-4"><p className={labelClasses}>Imágenes Actuales:</p><div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {existingImageUrls.map((url) => (
                  <div key={url} className="relative group aspect-square">
                    <img src={url} alt="Imagen existente" className="w-full h-full object-cover rounded-md" />
                    <button type="button" onClick={() => markImageForDeletion(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Eliminar imagen"><FaTrash size={12} /></button>
                  </div>
                ))}
            </div></div>
          )}
          {newImageFiles.length > 0 && (
            <div className="mb-4"><p className={labelClasses}>Imágenes Nuevas a Subir:</p><div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {newImageFiles.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img src={URL.createObjectURL(file)} alt={`Nueva imagen ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                    <button type="button" onClick={() => removeNewImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Quitar imagen"><FaTrash size={12} /></button>
                    {uploadProgress[file.name] && (<div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-400 rounded-b-md"><div className="h-full bg-brand-acento rounded-b-md" style={{ width: `${uploadProgress[file.name]}%` }}></div></div>)}
                  </div>
                ))}
            </div></div>
          )}
          <div>
            <label htmlFor="image-upload" className={`w-full flex flex-col justify-center items-center space-y-2 p-6 border-2 border-dashed rounded-md cursor-pointer ${labelClasses} border-light-borde dark:border-dark-borde hover:border-brand-acento dark:hover:border-brand-acento`}><FaPlus className="text-2xl" /><span className="text-xs">Añadir Imágenes</span></label>
            <input id="image-upload" type="file" multiple accept="image/jpeg, image/png, image/webp" onChange={handleImageChange} className="hidden" />
          </div>
        </div>
        
        {/* --- Mensajes y Botón de Envío --- */}
        {formError && <p className="text-sm text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300 p-3 rounded-md">{formError}</p>}
        {formSuccess && <p className="text-sm text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 p-3 rounded-md">{formSuccess}</p>}
        <div className="pt-5">
          <button type="submit" disabled={loading} className="w-full font-textos flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-acento hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-acento disabled:opacity-50">
            {loading ? <ClipLoader size={20} color="#fff" /> : (mode === 'create' ? 'Crear Producto' : 'Guardar Cambios')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormAdmin;