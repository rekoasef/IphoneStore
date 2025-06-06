// src/pages/admin/AdminProductFormPage.jsx
import React from 'react';
import ProductFormAdmin from '../../components/admin/products/ProductFormAdmin';

const AdminProductFormPage = ({ mode }) => {
  return (
    <div>
      <ProductFormAdmin mode={mode} />
    </div>
  );
};

export default AdminProductFormPage;