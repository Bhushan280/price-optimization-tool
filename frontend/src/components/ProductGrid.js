import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDarkMode } from '../context/DarkModeContext';

const ProductGrid = ({ products, onEdit, onDelete }) => {
  const { darkMode } = useDarkMode();

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    },
    pagination: true,
    paginationPageSize: 20,
    animateRows: true,
    getRowClass: () => (darkMode ? 'dark-row' : ''),
  };

  const columnDefs = [
    {
      headerName: 'Product Name',
      field: 'name',
      filter: 'agTextColumnFilter',
      minWidth: 200,
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agSetColumnFilter',
    },
    {
      headerName: 'Cost Price',
      field: 'cost_price',
      valueFormatter: (params) => {
        const value = parseFloat(params.value);
        return `$${isNaN(value) ? '0.00' : value.toFixed(2)}`;
      },
    },
    {
      headerName: 'Selling Price',
      field: 'selling_price',
      valueFormatter: (params) => {
        const value = parseFloat(params.value);
        return `$${isNaN(value) ? '0.00' : value.toFixed(2)}`;
      },
    },
    {
      headerName: 'Stock',
      field: 'stock_available',
      valueFormatter: (params) => {
        const value = parseInt(params.value);
        return isNaN(value) ? '0' : value.toLocaleString();
      },
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(params.data)}
            className='text-blue-600 hover:text-blue-800 dark:text-blue-400'
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(params.data.id)}
            className='text-red-600 hover:text-red-800 dark:text-red-400'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`ag-theme-alpine ${
        darkMode ? 'ag-theme-alpine-dark' : ''
      } rounded-xl shadow-lg overflow-hidden`}
      style={{ height: 600, width: '100%' }}
    >
      <AgGridReact
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        rowData={products}
        suppressRowClickSelection={true}
      />
    </div>
  );
};

export default ProductGrid;
