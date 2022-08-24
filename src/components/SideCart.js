import './SideCart.css'

function SideCartRow({ row, set, stepDown, stepUp, remove }) {
  return (
    <div className="row">
      <div className="name">{row.item.name}</div>
      <input min="1" type="number" className="quantity" value={row.quantity} onInput={set}/>
      <div className="edit">
        <div onClick={stepUp}>+</div>
        <div onClick={stepDown}>-</div>
      </div>
      <div className="remove" onClick={remove}>x</div>
      <div className="price">Price: ${row.item.price}</div>
      <div className="total">Total: ${row.item.price * row.quantity}</div>
    </div>
  );
}

function SideCart({ cart, style }) {
  return (
    <div id="side-cart">
      <h1>Your Cart</h1>
      {cart.rows.map((row) => (
        <SideCartRow
          row={row}
          stepUp={() => cart.stepQuantity(row, 1)}
          stepDown={() => cart.stepQuantity(row, -1)}
          remove={() => cart.remove(row)}
          set={(e) => cart.setQuantity(row, parseInt(e.target.value))}
        />
      ))}
    </div>
  );
}

export default SideCart;
