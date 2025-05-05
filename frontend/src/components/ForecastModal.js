import React from 'react';
import { Line } from 'react-chartjs-2';

const ForecastModal = ({ open, handleClose, chartData, product }) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl p-6 w-full max-w-2xl'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>
            Demand Forecast for {product?.name}
          </h2>
          <button
            onClick={handleClose}
            className='text-gray-500 hover:text-gray-700'
          >
            ✕
          </button>
        </div>
        <div className='h-96'>
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
