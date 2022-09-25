import { publish, subscribe } from './pubsub';


export default function stockSubs(stockHandler) {
  subscribe('CHECK STOCK CHANGE', async ({ id, increment }) => {
    publish(
      'CHECK STOCK CHANGE: COMPLETE',
      await stockHandler.checkStockChange({ id, increment })
    );
  });

  subscribe('CHANGE STOCK', async ({id, newStock}) => {
    publish('CHANGE STOCK: COMPLETE', await stockHandler.changeStock({id, newStock}))
  })
}
