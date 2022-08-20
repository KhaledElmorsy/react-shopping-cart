import { useState } from 'react'

function useCart(initialCart) {
  const [cart, setCart] = useState(initialCart);

  const getIndex = (item, cart) => cart.findIndex(row => row.item.id === item.id)

  const addItem = (item) => () => {
    setCart(prevState => {
      let newCart = [...prevState];
      let index = getIndex(item, newCart);
      if (index === -1) {
        newCart.push({item, quantity: 1})
      } else {
        let cartItem = newCart[index];
        newCart[index] = {...cartItem, quantity: cartItem.quantity + 1 }
      }
      return newCart;
    });
  }

  const removeItem = (item) => () => {
    setCart(prevState => {
      let newCart = [...prevState];
      let index = getIndex(item, newCart);
      if (newCart[index].quantity > 1) {
        let cartItem = newCart[index]
        newCart[index] = { ...cartItem, quantity: cartItem.quantity - 1}
      }
      return newCart;
    });
  }

  const deleteItem = (item) => () => {
    setCart(prevState => {
      let newCart = [...prevState];
      return newCart.filter(row => row.item !== item);
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return { addItem, removeItem, deleteItem, emptyCart, rows: cart }
}

export default useCart;
