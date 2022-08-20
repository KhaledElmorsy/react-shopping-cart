import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { NavBar, Cart, ProductList , Home } from './components';
import { navLinkStyle } from './theme'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar>
        <Link style={navLinkStyle} to="/">Home</Link>
        <Link style={navLinkStyle} to="products">Products</Link>
        <Link style={navLinkStyle} to="cart">Cart</Link>
      </NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
