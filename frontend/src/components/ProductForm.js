import React from 'react';
import api from '../api';

const ProductForm = ({ open, handleClose, product, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    category: '',
    cost_price: '',
    selling_price: '',
    description: '',
    stock_available: '',
    units_sold: '',
  });

  React.useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/products/api/products/${formData.id}/`, formData);
      } else {
        await api.post('/products/api/products/create/', formData);
      }
      const { data } = await api.get('/products/api/products/');
      onSubmit(data);
      handleClose();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Save failed: ' + err.response?.data || err.message);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm'
        onClick={handleClose}
      ></div>

      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100'>
          <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                {product ? 'Edit Product' : 'New Product'}
              </h2>
              <button
                onClick={handleClose}
                className='text-gray-500 hover:text-gray-700 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Product Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    placeholder='Enter product name'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white'
                  >
                    <option value=''>Select Category</option>
                    <option value='Stationary'>Stationary</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Wearables'>Wearables</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Cost Price ($) <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                      $
                    </span>
                    <input
                      type='number'
                      name='cost_price'
                      value={formData.cost_price}
                      onChange={handleChange}
                      required
                      min='0'
                      step='0.01'
                      className='w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                      placeholder='0.00'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Selling Price ($) <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                      $
                    </span>
                    <input
                      type='number'
                      name='selling_price'
                      value={formData.selling_price}
                      onChange={handleChange}
                      required
                      min='0'
                      step='0.01'
                      className='w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                      placeholder='0.00'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]'
                  placeholder='Enter product description...'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Stock Available <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    name='stock_available'
                    value={formData.stock_available}
                    onChange={handleChange}
                    required
                    min='0'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    placeholder='0'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Units Sold
                  </label>
                  <input
                    type='number'
                    name='units_sold'
                    value={formData.units_sold}
                    onChange={handleChange}
                    min='0'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                    placeholder='0'
                  />
                </div>
              </div>

              <div className='flex justify-center gap-4 pt-6'>
                <button
                  type='button'
                  onClick={handleClose}
                  className='px-8 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
