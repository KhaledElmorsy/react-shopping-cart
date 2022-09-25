import { subscribe, publish, unsubscribe } from "./pubsub"
import stockHandler from "./stockHandler"
import stockSubs from "./stockSubs"

const routines = {
  cart() {
    stockSubs(stockHandler)
    subscribe('ROUTINE: ADD TO CART', ({id, increment}) => {
      let stockCheck = subscribe('CHECK STOCK CHANGE: COMPLETE', ({id, newStock, err}) => {
        if (err) {
          publish('ERROR: NONE LEFT')
        } else {
          publish('CHANGE STOCK', {id, newStock})
          publish('CART: ADD', id)
        }
        unsubscribe(stockCheck)
      })

      publish('CHECK STOCK CHANGE', {id, increment: -1 * increment})
    })
  }
}

export default routines
