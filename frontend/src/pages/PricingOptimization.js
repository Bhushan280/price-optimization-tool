import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PricingOptimization = () => {
  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const optimizePrices = async () => {
    try {
      await api.post('/products/api/optimize-prices/');
      fetchProducts();
    } catch (err) {
      console.error('Optimization failed:', err);
      alert('Price optimization failed!');
    }
  };

  const fetchDemandForecast = async (id) => {
    try {
      const { data } = await api.get(`/products/api/demand-forecast/${id}/`);
      setChartData({
        labels: data.prices.map((p) => `$${p.toFixed(2)}`),
        datasets: [{ label: 'Demand', data: data.demand, tension: 0.1 }],
      });
      setSelectedProduct(products.find((p) => p.id === id));
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Pricing Optimization</h1>
      <button
        onClick={optimizePrices}
        className='mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        Run Price Optimization
      </button>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
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
                  className='px-6 py-3 text-left text-sm font-medium text-gray-500'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {products.map((p) => (
              <tr key={p.id}>
                <td className='px-6 py-4'>{p.name}</td>
                <td className='px-6 py-4'>{p.category}</td>
                <td className='px-6 py-4'>${p.cost_price}</td>
                <td className='px-6 py-4'>${p.selling_price}</td>
                <td className='px-6 py-4'>${p.optimized_price ?? '-'}</td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => fetchDemandForecast(p.id)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    Show Forecast
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {chartData && selectedProduct && (
        <div className='mt-8 p-6 bg-white rounded-lg shadow'>
          <h2 className='text-xl font-bold mb-4'>
            Demand Forecast for {selectedProduct.name}
          </h2>
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
      )}
    </div>
  );
};

export default PricingOptimization;
