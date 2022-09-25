import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { NavBar, Cart, ProductList , Home } from './components';
import { navLinkStyle } from './theme'
import { useEffect } from 'react';
import './App.css'
import useCart from './utility/useCart'
import cartSubs from './utility/cartSubs';
import routines from './utility/routines';

function App() {
  const cartHook = useCart([])
  let { cart } = cartHook;
  useEffect(()=>{
    cartSubs(cartHook)
    routines.cart();
  },[])
  
  return (
    <BrowserRouter>
      <NavBar>
        <Link style={navLinkStyle} to="/">Home</Link>
        <Link style={navLinkStyle} to="products">Products</Link>
        <Link style={navLinkStyle} to="cart">Cart</Link>
      </NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
