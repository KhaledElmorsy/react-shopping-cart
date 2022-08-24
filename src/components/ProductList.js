import { useEffect, useState } from 'react';
import './ProductList.css';
import items from '../model/data';
import Product from './Product';
import SideCart from './SideCart';

function ProductList({ cart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(items);
  }, []);

  return (
    <div id="product-list">
      <div id="grid-container">
        <div id="products">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={() => cart.add(product)}
            />
          ))}
        </div>
      </div>
      <SideCart style={{ width: '400px' }} cart={cart} />
    </div>
  );
}

export default ProductList;
