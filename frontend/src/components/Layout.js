import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='min-h-screen flex'>
      <div className='w-64 bg-white border-r p-4'>
        <h2 className='text-xl font-bold mb-6'>Price Optimization</h2>
        <nav className='space-y-2'>
          <Link
            to='/'
            className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
          >
            Product Management
          </Link>
          <Link
            to='/pricing'
            className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
          >
            Pricing Optimization
          </Link>
        </nav>
      </div>

      <div className='flex-1'>
        <header className='bg-white shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h1 className='text-xl font-semibold'>Welcome, Bhushan Chouhan</h1>
            <button
              onClick={handleLogout}
              className='text-gray-600 hover:text-gray-800'
            >
              Logout
            </button>
          </div>
        </header>

        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
