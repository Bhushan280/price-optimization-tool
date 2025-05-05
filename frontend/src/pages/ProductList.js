import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductForm from '../components/ProductForm';
import api from '../api';


const ProductList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Gio - Note Pad',
      category: 'Stationary',
      cost_price: 1.2,
      selling_price: 2.7,
      description: 'Lorem ipsum dolor sit amet...',
      stock_available: 1212123,
      units_sold: 131244,
    },
  ]);

  const handleCreate = () => {
    setSelectedProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products/api/products/');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.response?.status === 401) window.location = '/login';
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = async (newList) => {
    setProducts(newList);
  };

  // const handleSubmit = async (formData) => {
  //   try {
  //     if (formData.id) {
  //       await api.put(`/products/api/products/${formData.id}/`, formData);
  //     } else {
  //       await api.post('/products/api/products/create/', formData);
  //     }
  //     // Force refresh from server
  //     const { data } = await api.get('/products/api/products/');
  //     setProducts(data);
  //   } catch (error) {
  //     console.error('Error saving product:', error);
  //   }
  //   setOpenForm(false);
  // };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Product Management</h1>
        <button
          onClick={handleCreate}
          className='btn-primary flex items-center gap-2'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>
          Add Product
        </button>
      </div>

      <ProductGrid
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        product={selectedProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductList;
