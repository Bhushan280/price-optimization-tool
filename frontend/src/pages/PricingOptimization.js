// src/pages/PricingOptimization.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
// …chart.js imports…

export default function PricingOptimization() {
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data } = await api.get('/products/api/products/');
      setProducts(data);
    } catch {
      /* handle */
    }
  }

  async function optimizePrices() {
    try {
      await api.post('/products/api/optimize-prices/');
      fetchProducts();
    } catch {
      alert('Price optimization failed!');
    }
  }

  async function fetchDemandForecast(id) {
    const { data } = await api.get(`/products/api/demand-forecast/${id}/`);
    setChartData({
      labels: data.prices.map((p) => `$${p.toFixed(2)}`),
      datasets: [{ label: 'Demand', data: data.demand, tension: 0.1 }],
    });
    setSelectedProduct(products.find((p) => p.id === id));
  }

  return (
    <div className='bg-gray-100 min-h-screen p-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-4xl font-extrabold text-gray-900'>
          Pricing Optimization
        </h1>
        <button
          onClick={optimizePrices}
          className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow'
        >
          Run Price Optimization
        </button>
      </div>

      {/* Table Card */}
      <div className='bg-white rounded-2xl shadow-lg overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-50'>
            <tr>
              {[
                'Product',
                'Category',
                'Cost Price',
                'Current Price',
                'Optimized Price',
                'View Forecast',
              ].map((h) => (
                <th
                  key={h}
                  className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {products.map((p) => (
              <tr key={p.id} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  {p.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  {p.category}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  ${p.cost_price}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  ${p.selling_price}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-gray-700'>
                  {p.optimized_price ? `$${p.optimized_price}` : '-'}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button
                    onClick={() => fetchDemandForecast(p.id)}
                    className='text-indigo-600 hover:text-indigo-800 font-medium'
                  >
                    Show Forecast
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Forecast Modal */}
      {chartData && selectedProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Demand Forecast for {selectedProduct.name}
              </h2>
              <button
                onClick={() => setChartData(null)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            <div className='h-96'>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Demand vs Price' },
                  },
                  scales: {
                    x: { title: { display: true, text: 'Price' } },
                    y: { title: { display: true, text: 'Demand' } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
