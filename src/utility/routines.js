import { subscribe, publish, unsubscribe } from "./pubsub"
import stockHandler from "./stockHandler"
import stockSubs from "./stockSubs"

const routines = {
  cart() {
    stockSubs(stockHandler)
    subscribe('ROUTINE: ADD TO CART', ({id}) => {
      subscribe('CHECK STOCK CHANGE: COMPLETE', ({id, newStock, err}) => {
        if (err) {
          publish('ALERT', 'None Left')
        } else {
          subscribe('CART: GET - SUCCESS', (items) => {
            if (!items.length){
              publish('CART: ADD', id)
            } else {
              publish('CART: STEPQUANTITY', {id, increment: 1})
            }
          }, {once: true})
          publish('CART: GET', (row) => row.id === id)
          publish('CHANGE STOCK', {id, newStock})
        }
      }, {once: true})
      publish('CHECK STOCK CHANGE', {id, increment: -1})
    })

    subscribe('ROUTINE: REMOVE FROM CART', ({id}) => {
      subscribe('CART: GET - SUCCESS', (items) => {
        const item = items[0];
        publish('CART: REMOVE', id)
        let stockSub = subscribe('CHECK STOCK CHANGE: COMPLETE', ({id, newStock, err}) => {
          publish('CHANGE STOCK', {id, newStock: newStock + item.quantity})
          unsubscribe(stockSub)
        })
        publish('CHECK STOCK CHANGE', {id, increment: 0})
      }, {once: true})
      publish('CART: GET', (row) => row.id === id)
    });
    subscribe('ROUTINE: INCREMENT CART', ({id, increment}) => {
      subscribe('CART: GET - SUCCESS', (items) => {
        const item = items[0];
        const quantity = item.quantity
        const newCartQuantity = quantity + increment
        if (newCartQuantity >= 0){
          subscribe('CHECK STOCK CHANGE: COMPLETE', ({id, newStock, err}) => {
            if (!err) {
              publish('CHANGE STOCK', { id, newStock})
              if (newCartQuantity === 0) {
                publish('CART: REMOVE', id)
              } else {
                publish('CART: STEPQUANTITY', {id, increment})
              }
            } else {
              publish('ALERT', 'None left')
            }
          }, {once: true})
          publish('CHECK STOCK CHANGE', {id, increment: -1 * increment})
        }
      }, {once: true})
      publish('CART: GET', (row) => row.id === id)
    })
  }
}

export default routines
