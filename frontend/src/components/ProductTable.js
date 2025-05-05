import React from 'react';

const ProductTable = ({ products, onEdit, onDelete, onCreate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const categories = ['All', 'Stationary', 'Electronics', 'Wearables'];

  return (
    <div className='bg-white rounded-xl shadow-lg p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Search by name'
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=''>All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onCreate}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2'
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

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Product Name
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Cost Price
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Selling Price
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Available Stock
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Units Sold
              </th>
              <th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map((product) => (
              <tr key={product.id}>
                <td className='px-6 py-4'>{product.name}</td>
                <td className='px-6 py-4'>{product.category}</td>
                <td className='px-6 py-4'>${product.cost_price}</td>
                <td className='px-6 py-4'>${product.selling_price}</td>
                <td className='px-6 py-4'>{product.stock_available}</td>
                <td className='px-6 py-4'>{product.units_sold}</td>
                <td className='px-6 py-4 flex gap-2'>
                  <button
                    onClick={() => onEdit(product)}
                    className='text-blue-600 hover:text-blue-800'
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
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className='text-red-600 hover:text-red-800'
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
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
