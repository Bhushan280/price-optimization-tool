import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import PricingOptimization from './pages/PricingOptimization';
import Login from './pages/Login';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/pricing' element={<PricingOptimization />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
