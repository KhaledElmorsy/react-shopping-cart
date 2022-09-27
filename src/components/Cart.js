import React from 'react'
import controller from '../model/controller'
import { useState, useEffect } from 'react'
import './Cart.css'
import { publish } from '../utility/pubsub'

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
      <div className="heading title">Item</div>
      <div className="heading price">Price</div>
      <div className="heading quantity">Quantity</div>
      <div className="heading edit">Edit</div>
      <div className="heading total">Total</div>
      {cartItems.map((item, i) => (
        <React.Fragment key={i}>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.quantity}</div>
          <div className="edit">
            <div onClick={() => publish('ROUTINE: INCREMENT CART', {id: item.id, increment: 1})}>+</div>
            <div onClick={() => publish('ROUTINE: INCREMENT CART', {id: item.id, increment: -1})}>-</div>
            {false ? <div className="disabled">-</div> : 
             <div onClick={() => publish('ROUTINE: REMOVE FROM CART', {id: item.id})}>x</div> }
          </div>
          <div>{item.price * item.quantity}</div>
        </ React.Fragment>
        ))
      }
    </div>
  </div>
  )
}

export default Cart
