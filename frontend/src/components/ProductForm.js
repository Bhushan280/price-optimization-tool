import axios from 'axios';

import React from 'react';

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
      const response = await axios.post(
        'http://localhost:8000/products/api/products/create/',
        formData
      );
      onSubmit(response.data); // Update parent state
      handleClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`fixed inset-0 bg-black/50 ${open ? 'block' : 'hidden'}`}>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white rounded-xl p-6 w-full max-w-2xl'>
          <h2 className='text-2xl font-bold mb-4'>
            {product ? 'Edit Product' : 'New Product'}
          </h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Product Name
              </label>
              <input
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='input-field'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='input-field'
              >
                <option value=''>Select Category</option>
                <option value='Stationary'>Stationary</option>
                <option value='Electronics'>Electronics</option>
                <option value='Wearables'>Wearables</option>
              </select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Cost Price
                </label>
                <input
                  type='number'
                  name='cost_price'
                  value={formData.cost_price}
                  onChange={handleChange}
                  className='input-field'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Selling Price
                </label>
                <input
                  type='number'
                  name='selling_price'
                  value={formData.selling_price}
                  onChange={handleChange}
                  className='input-field'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Description
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='input-field h-32'
              />
            </div>

            <div className='flex justify-end gap-3 mt-6'>
              <button
                type='button'
                onClick={handleClose}
                className='px-4 py-2 text-secondary hover:text-secondary-dark'
              >
                Cancel
              </button>
              <button type='submit' className='btn-primary'>
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ProductForm;