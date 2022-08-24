import pubsub from './utility/pubsub'

const { subscribe, unsubscribe, publish } = pubsub

it('creates subscriptions to events and calls callbacks when published', () => {
  let callback = jest.fn();
  subscribe('TEST', callback);
  publish('TEST');
  expect(callback).toHaveBeenCalled()
})

it('calls callback correctly with payload', () => {
  let callback = jest.fn();
  subscribe('TEST', callback);
  let args = [1, '5', false]
  publish('TEST', ...args)
  expect(callback).toHaveBeenCalledWith(...args)
})

it('unsubscribes from events using a returned subscription token', () => {
  let callback = jest.fn();
  let testSub = subscribe('TEST', callback);
  unsubscribe(testSub);
  publish('TEST');
  expect(callback).not.toHaveBeenCalled()
})

it('works with async functions',  (done) => {
  let outerCallback = async() => {
    await new Promise(res => setTimeout(res, 1))
    expect(true).toBe(true)
    done()
  };
  subscribe('TEST', outerCallback)
  publish('TEST');
})
