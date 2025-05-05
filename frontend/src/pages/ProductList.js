import React, { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductForm from '../components/ProductForm';
import api from '../api';

const ProductList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products/api/products/');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold dark:text-white'>
          Product Management
        </h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpenForm(true);
          }}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
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

      {loading ? (
        <div className='text-center py-8 dark:text-white'>
          Loading products...
        </div>
      ) : products.length > 0 ? (
        <ProductGrid
          products={products}
          onEdit={setSelectedProduct}
          onDelete={handleDelete}
        />
      ) : (
        <div className='text-center py-8 dark:text-white'>
          No products found
        </div>
      )}

      <ProductForm
        open={openForm}
        handleClose={() => setOpenForm(false)}
        product={selectedProduct}
        onSubmit={fetchProducts} // Changed to directly use fetchProducts
      />
    </div>
  );
};

export default ProductList;
