import React from 'react'
import './Cart.css'

function Cart({cart}) {
  return (
  <div id="cart">
    <div className="table">
      <div className="title">Item</div>
      <div className="title">Price</div>
      <div className="title">Quantity</div>
      <div className="title">Edit</div>
      <div className="title">Total</div>
      {cart.rows.map((row, i) => (
        <React.Fragment key={i}>
          <div>{row.item.name}</div>
          <div>{row.item.price}</div>
          <div>{row.quantity}</div>
          <div className="edit">
            <div onClick={() => cart.stepQuantity(row, 1)}>+</div>
            <div onClick={() => cart.stepQuantity(row, -1)}>-</div>
            {row.item.quantity === 1 ? <div className="disabled">-</div> : 
             <div onClick={() => cart.remove(row)}>x</div> }
          </div>
          <div>{row.item.price * row.quantity}</div>
        </ React.Fragment>
        ))
      }
    </div>
  </div>
  )
}

export default Cart
