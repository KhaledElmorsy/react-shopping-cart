const events = {};
export function subscribe(event, callback, options = {once: false}) {
  events[event] ||= {};
  const id = Object.keys(events[event]).length;
  events[event][id] = {callback, once: options.once};
  return { event, id }; // token
}

export function unsubscribe(token) {
  delete events[token.event][token.id];
}

export function publish(event, ...payload) {
  if (!events[event]) return;
  for (let id in events[event]) {
    let current = events[event][id]
    current?.callback?.(...payload);
    if (current.once) {
      delete events[event][id]
    } 
  }
}

const pubsub = { publish, subscribe, unsubscribe };
export default pubsub;
