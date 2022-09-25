const events = {};
export function subscribe(event, callback) {
  events[event] ||= {};
  const id = Object.keys(events[event]).length;
  events[event][id] = callback;
  return { event, id }; // token
}

export function unsubscribe(token) {
  delete events[token.event][token.id];
}

export function publish(event, ...payload) {
  if (!events[event]) return;
  for (let id in events[event]) {
    events[event][id]?.(...payload);
  }
}

const pubsub = { publish, subscribe, unsubscribe };
export default pubsub;
