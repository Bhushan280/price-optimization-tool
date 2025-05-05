import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import { useDarkMode } from '../context/DarkModeContext';
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

export default function PricingOptimization() {
  const { darkMode } = useDarkMode();
  const [products, setProducts] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [chartKey, setChartKey] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const runOpt = async () => {
    try {
      await api.post('/products/api/optimize-prices/');
      const { data } = await api.get('/products/api/products/');
      setProducts(data);
    } catch (error) {
      console.error('Optimization failed:', error);
    }
  };

  const showForecast = async (id) => {
    try {
      const { data } = await api.get(`/products/api/demand-forecast/${id}/`);
      const chartData = {
        labels: data.prices.map((p) => `$${p.toFixed(2)}`),
        datasets: [
          {
            label: 'Demand',
            data: data.demand,
            tension: 0.3,
            borderColor: darkMode ? '#3b82f6' : '#2563eb',
            backgroundColor: darkMode ? '#1e3a8a' : '#93c5fd',
          },
        ],
      };
      setForecast(chartData);
      setChartKey((k) => k + 1);
    } catch (error) {
      console.error('Forecast failed:', error);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2
          className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Pricing Optimization
        </h2>
        <button
          onClick={runOpt}
          className={`px-4 py-2 rounded transition-colors ${
            darkMode
              ? 'bg-green-700 hover:bg-green-800 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Run Price Optimization
        </button>
      </div>

      {loading ? (
        <div
          className={`text-center py-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div
          className={`text-center py-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          No products available. Add products first to run optimization.
        </div>
      ) : (
        <>
          <div
            className={`overflow-x-auto rounded-lg shadow ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <tr>
                  {[
                    'Product',
                    'Category',
                    'Cost',
                    'Current',
                    'Optimized',
                    'Forecast',
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-6 py-3 text-left text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  darkMode
                    ? 'divide-gray-700 bg-gray-800'
                    : 'divide-gray-200 bg-white'
                }`}
              >
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className={
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }
                  >
                    <td className={`px-6 py-4 ${darkMode ? 'text-white' : ''}`}>
                      {p.name}
                    </td>
                    <td
                      className={`px-6 py-4 ${darkMode ? 'text-gray-300' : ''}`}
                    >
                      {p.category}
                    </td>
                    <td
                      className={`px-6 py-4 ${darkMode ? 'text-gray-300' : ''}`}
                    >
                      ${p.cost_price}
                    </td>
                    <td
                      className={`px-6 py-4 ${darkMode ? 'text-gray-300' : ''}`}
                    >
                      ${p.selling_price}
                    </td>
                    <td
                      className={`px-6 py-4 ${darkMode ? 'text-gray-300' : ''}`}
                    >
                      ${p.optimized_price || '-'}
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => showForecast(p.id)}
                        className={`${
                          darkMode ? 'text-indigo-400' : 'text-indigo-600'
                        } hover:underline`}
                      >
                        Show
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {forecast && (
            <div
              className={`p-6 rounded-lg shadow ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Line
                key={chartKey}
                data={forecast}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: darkMode ? '#fff' : '#000',
                      },
                    },
                    title: {
                      display: true,
                      text: 'Demand vs Price',
                      color: darkMode ? '#fff' : '#000',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Price',
                        color: darkMode ? '#fff' : '#000',
                      },
                      grid: {
                        color: darkMode ? '#374151' : '#e5e7eb',
                      },
                      ticks: {
                        color: darkMode ? '#fff' : '#000',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Demand',
                        color: darkMode ? '#fff' : '#000',
                      },
                      grid: {
                        color: darkMode ? '#374151' : '#e5e7eb',
                      },
                      ticks: {
                        color: darkMode ? '#fff' : '#000',
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
