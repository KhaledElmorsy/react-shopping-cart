import { useEffect, useState } from 'react';
import './ProductList.css';
import Product from './Product';
import SideCart from './SideCart';
import controller from '../model/controller';
import { subscribe, publish, unsubscribe } from '../utility/pubsub';

function ProductList({ cart }) {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    let stockTracker = subscribe('CHANGE STOCK: COMPLETE', () => {
      setUpdate(prev => !prev)
    });
    return () => unsubscribe(stockTracker);
  }, []);

  useEffect(() => {
    (async () => {
      setProducts(await controller.getAll());
    })();
  }, [update]);
  return (
    <div id="product-list">
      <div id="grid-container">
        <div id="products">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={() =>
                publish('ROUTINE: ADD TO CART', { id: product.id })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
