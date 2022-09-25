import React from 'react'
import controller from '../model/controller'
import { useState, useEffect } from 'react'
import './Cart.css'

function Cart({cart}) {
  const [cartItems, setCartItems] = useState([])
  
  useEffect(()=>{
    (async()=>{
      const relevantItems = await controller.getFiltered((data) => 
        cart.map(row => row.id).includes(data.id)
      )
      setCartItems(cart.map(row => {
        const item = relevantItems.find(item => item.id === row.id)
        return {
          id: row.id,
          quantity: row.quantity,
          name: item.name,
          price: item.price
        }
      }))
    })()
  }, [cart])
  return (
  <div id="cart">
    <div className="table">
      <div className="title">Item</div>
      <div className="price">Price</div>
      <div className="quantity">Quantity</div>
      <div className="edit">Edit</div>
      <div className="total">Total</div>
      {cartItems.map((item, i) => (
        <React.Fragment key={i}>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.quantity}</div>
          <div className="edit">
            <div onClick={true}>+</div>
            <div onClick={true}>-</div>
            {false ? <div className="disabled">-</div> : 
             <div onClick={true}>x</div> }
          </div>
          <div>{}</div>
        </ React.Fragment>
        ))
      }
    </div>
  </div>
  )
}

export default Cart
