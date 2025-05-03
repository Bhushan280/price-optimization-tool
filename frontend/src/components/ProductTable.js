import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ProductTable = ({ products, onEdit, onDelete, onCreate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const categories = ['All', 'Stationary', 'Electronics', 'Wearables']; // Add your categories

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label='Search by name'
            variant='outlined'
            size='small'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            size='small'
            sx={{ minWidth: 120 }}
          >
            <MenuItem value=''>All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button variant='contained' startIcon={<Add />} onClick={onCreate}>
          Add Product
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Cost Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Available Stock</TableCell>
              <TableCell>Units Sold</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.cost_price}</TableCell>
                <TableCell>${product.selling_price}</TableCell>
                <TableCell>{product.stock_available}</TableCell>
                <TableCell>{product.units_sold}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(product)}>
                    <Edit color='primary' />
                  </IconButton>
                  <IconButton onClick={() => onDelete(product.id)}>
                    <Delete color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductTable;
