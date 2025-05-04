import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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
    const response = await axios.get(
      'http://localhost:8000/products/api/products/'
    );
    setProducts(response.data);
  };
    

  const fetchDemandForecast = async (productId) => {
    const response = await axios.get(
      `http://localhost:8000/products/api/demand-forecast/${productId}/`
    );
    setChartData({
      labels: response.data.prices.map((p) => `$${p.toFixed(2)}`),
      datasets: [
        {
          label: 'Demand Forecast',
          data: response.data.demand,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  };

  const optimizePrices = async () => {
    await axios.post('http://localhost:8000/api/products/optimize-prices/');
    fetchProducts();
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom sx={{ mt: 3 }}>
        Pricing Optimization
      </Typography>

      <Button variant='contained' onClick={optimizePrices} sx={{ mb: 3 }}>
        Run Price Optimization
      </Button>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Optimized Price</TableCell>
              <TableCell>Demand Forecast</TableCell>
              <TableCell>View Forecast</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.cost_price}</TableCell>
                <TableCell>${product.selling_price}</TableCell>
                <TableCell>${product.optimized_price || '-'}</TableCell>
                <TableCell>{product.demand_forecast}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    onClick={() => {
                      setSelectedProduct(product);
                      fetchDemandForecast(product.id);
                    }}
                  >
                    Show Forecast
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {chartData && selectedProduct && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant='h6' gutterBottom>
            Demand Forecast for {selectedProduct.name}
          </Typography>
          <div style={{ height: '400px' }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: {
                    display: true,
                    text: 'Demand vs Price Relationship',
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: 'Price' },
                  },
                  y: {
                    title: { display: true, text: 'Demand' },
                  },
                },
              }}
            />
          </div>
        </Paper>
      )}
    </Container>
  );
};

export default PricingOptimization;
