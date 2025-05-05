import React, { useEffect, useState } from 'react';
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

export default function PricingOptimization() {
  const [products, setProducts] = useState([]);
  const [forecast, setForecast] = useState(null);

  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    api.get('/products/api/products/').then((r) => {
      setProducts(r.data);
    });
  }, []);

  const runOpt = async () => {
    await api.post('/products/api/optimize-prices/');
    const { data } = await api.get('/products/api/products/');
    setProducts(data);
  };

  const showForecast = async (id) => {
    const { data } = await api.get(`/products/api/demand-forecast/${id}/`);

    const chartData = {
      labels: data.prices.map((p) => `$${p.toFixed(2)}`),
      datasets: [
        {
          label: 'Demand',
          data: data.demand,
          tension: 0.3,
        },
      ],
    };

    setForecast(chartData);
    setChartKey((k) => k + 1);
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold'>Pricing Optimization</h2>
        <button
          onClick={runOpt}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Run Price Optimization
        </button>
      </div>

      <div className='overflow-x-auto bg-white shadow rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
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
                    onClick={() => showForecast(p.id)}
                    className='text-indigo-600 hover:underline'
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
        <div className='bg-white p-6 rounded-lg shadow'>
          <Line
            key={chartKey} // 2️⃣ force remount for new canvas
            data={forecast}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Demand vs Price' },
              },
              scales: {
                x: {
                  // now a registered CategoryScale
                  title: { display: true, text: 'Price' },
                },
                y: {
                  title: { display: true, text: 'Demand' },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
