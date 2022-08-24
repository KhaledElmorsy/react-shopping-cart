import { useState } from 'react';

function useCart(initialCart) {
  const [cart, setCart] = useState(initialCart);

  const findItemRow = (item, cart) =>
    cart.find((row) => row.item.id === item.id);

  const add = (item)  => {
    const row = findItemRow(item, cart);
    if (row) {
      stepQuantity(row, 1);
    } else {
      setCart((prevCart) => prevCart.concat([{item, quantity: 1}]));
    }
  };

  const remove = (row) => {
    setCart((prevCart) => [...prevCart].filter((cartRow) => cartRow !== row));
  };

  const edit = (row, callback) => {
    setCart((prevCart) => {
      return [...prevCart].map((cartRow) => {
        return cartRow === row ? callback(cartRow) : cartRow;
      });
    });
  };

  const stepQuantity = (row, increment) => {
    edit(row, (cartRow) => ({
      ...cartRow,
      quantity: (cartRow.quantity + increment) || 1,
    }));
  };

  const setQuantity = (row, newQuantity) => {
    edit(row, (cartRow) => ({
      ...cartRow,
      quantity: newQuantity,
    }));
  };

  function emptyCart() {
    setCart([]);
  }

  return { add, remove, stepQuantity, setQuantity, emptyCart, rows: cart };
}

export default useCart;
