import { useEffect, useState } from 'react';
import './ProductList.css'
import items from '../items'
import Product from './Product';

function ProductList({cart}) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    setProducts(items)
  }, [])

  return (
    <div className="product-list">
      {products.map(product => 
        <Product 
          key={product.id} 
          product={product} 
          addToCart={cart.addItem(product)}
          />
        )}
    </div>
  )
}

export default ProductList;
