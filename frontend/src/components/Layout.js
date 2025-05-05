import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Layout = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='min-h-screen flex'>
      <div className='w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4'>
        <h2 className='text-xl font-bold mb-6 dark:text-white'>
          Price Optimization
        </h2>
        <nav className='space-y-2'>
          <Link
            to='/'
            className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700'
          >
            Product Management
          </Link>
          <Link
            to='/pricing'
            className='block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700'
          >
            Pricing Optimization
          </Link>
        </nav>
      </div>

      <div className='flex-1'>
        <header className='bg-white dark:bg-gray-800 shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h1 className='text-xl font-semibold dark:text-white'>
              Welcome, Bhushan Chouhan
            </h1>
            <div className='flex items-center gap-4'>
              <button
                onClick={toggleDarkMode}
                className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white'
              >
                {darkMode ? (
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleLogout}
                className='text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-4 py-2 rounded-lg transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className='p-6 bg-gray-50 dark:bg-gray-900 min-h-screen'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
