import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ProductTable from '../components/ProductTable';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Will connect to Django API later
    const mockData = [
      { id: 1, name: 'Sample Product', category: 'Test', price: 99.99 },
    ];
    setProducts(mockData);
  }, []);

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Product Management
      </Typography>
      <ProductTable products={products} />
    </Container>
  );
};

export default ProductList;
