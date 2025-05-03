// In App.js, change this import:
import PricingOptimization from './pages/PricingOptimization';

// From your code, it should look like:
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pricing' element={<PricingOptimization />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
