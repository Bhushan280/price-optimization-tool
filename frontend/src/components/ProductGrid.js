import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';

const ProductGrid = ({ products, onEdit, onDelete }) => {
  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    pagination: true,
    paginationPageSize: 10,
  };

  const columnDefs = [
    { headerName: 'Product Name', field: 'name', filter: 'agTextColumnFilter' },
    { headerName: 'Category', field: 'category', filter: 'agSetColumnFilter' },
    {
      headerName: 'Cost Price',
      field: 'cost_price',
      valueFormatter: (params) => {
        const val = Number(params.value);
        return isNaN(val) ? params.value : `$${val.toFixed(2)}`;
      },
    },
    {
      headerName: 'Selling Price',
      field: 'selling_price',
      valueFormatter: (params) => {
        const val = Number(params.value);
        return isNaN(val) ? params.value : `$${val.toFixed(2)}`;
      },
    },
    {
      headerName: 'Stock',
      field: 'stock_available',
      valueFormatter: (params) => {
        const val = Number(params.value);
        return isNaN(val) ? params.value : val.toLocaleString();
      },
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className='flex gap-2'>
          <button
            onClick={() => onEdit(params.data)}
            className='text-blue-600 hover:text-blue-800'
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(params.data.id)}
            className='text-red-600 hover:text-red-800'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='ag-theme-alpine rounded-xl shadow-lg overflow-hidden'>
      <AgGridReact
        className='h-[600px] w-full'
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        rowData={products}
        domLayout='autoHeight'
        pagination={true}
        paginationPageSize={10}
        suppressRowClickSelection={true}
      />
    </div>
  );
};

export default ProductGrid;
