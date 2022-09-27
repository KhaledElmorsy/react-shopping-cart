import { isCompositeComponent } from 'react-dom/test-utils';
import controller from '../model/controller';

export async function checkStockChange({ id, increment}) {
  let [item] = await controller.getFiltered((item) => item.id === id)
  if (!item) {
    return { id, newStock: undefined, err: 'item not found'};
  }
  const newStock =  item.stock + increment;
  return newStock >= 0 
    ? { id, newStock: newStock, err: null }
    : { id, newStock: undefined, err: 'no stock left' }
}

export async function changeStock({ id, newStock }) {
  try {
    await controller.setField(id, 'stock', newStock)
    return true
  } catch {
    return false
  }
}

const stockHandler = {
  checkStockChange,
  changeStock
}

export default stockHandler
