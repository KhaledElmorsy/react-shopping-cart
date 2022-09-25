import data from './data'

const controller = function(model) {

  const clone = (object) => JSON.parse(JSON.stringify(object))
  async function getAll() {
    return clone(model);
  }

  async function getFiltered(callback) {
    return clone(model.filter(callback))
  }

  async function setField(id, field, newValue) {
    const item = model.find(item => item.id === id);
    if (!item[field]) throw new Error('Field does\'t exist');
    item[field] = newValue;
  }

  return { getAll, getFiltered, setField };
}(data)

export default controller
