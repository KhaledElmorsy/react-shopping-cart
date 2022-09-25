import { useState } from 'react';

/**
 * 
 * @param {[]} initialCart Cart's initial state
 */
function useCart(initialCart) {
  const [cart, setCart] = useState(() => initialCart);
  /**
   * Add an ID to the cart
   * @param {string} id The cart item's ID
   */
  const add = (id)  => {
    let step;
    setCart(prevCart => {
      if (prevCart.find(row => row.id === id)) {
        step = true;
        return prevCart;
      } else {
       return prevCart.concat([{id, quantity: 1}]);
      }
    })
    if (step) stepQuantity(id, 1)
  };

  /**
   * Remove item\'s row from the cart
   * @param {string} id Item ID
   */
  const remove = (id) => {
    setCart((prevCart) => [...prevCart].filter((row) => row.id !== id));
  };

  /**
   * Edit cart item rows based on a filter function
   * @param {Function} filter Callback to filter cart items
   * @param {Function} callback Callback function to apply to the cart row
   */
  const edit = (filter, callback) => {
    setCart((prevCart) => {
      return [...prevCart].map((row) => {
        return filter(row) 
          ? callback(row)
          : row;
      });
    });
  };

  /**
   * Increment an item\'s quantity in the cart
   * @param {string} id Item ID
   * @param {number} increment Value to increment quantity by. Can be negative.
   */
  const stepQuantity = (id, increment) => {
    edit((row => row.id === id), (row) => ({
      ...row,
      quantity: (row.quantity + increment) || 1,
    }));
  };

  /**
   * Set the quantity of an item in the cart
   * @param {string} id Item ID
   * @param {number} newQuantity New quantity value. Should not be less than 0.
   */
  const setQuantity = (id, newQuantity) => {
    edit((row => row.id === id), (row) => ({
      ...row,
      quantity: newQuantity,
    }));
  };

  /**
   * Get a clone of the cart's contents
   * @returns {Object}
   */
  const getItems = (filter) => {
    return JSON.parse(JSON.stringify(cart.filter(filter ?? (_=>1))))
  }

  /** Reset the cart to an empty array */
  const emptyCart = () => setCart([])

  return { cart, add, remove, stepQuantity, setQuantity, emptyCart, getItems };
}


export default useCart;
