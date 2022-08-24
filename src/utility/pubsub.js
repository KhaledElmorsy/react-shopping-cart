export default  (function(){
  const events = {};
  function subscribe(event, callback) {
    events[event] ||= {};
    const id = Object.keys(events[event]).length
    events[event][id] = callback;
    return {event, id} // token
  }
  
  function unsubscribe(token) {
    events[token.event][token.id] = undefined;
  }

  function publish(event, ...payload) {
    if(!events[event]) return
    for (let id in events[event]){
      events[event][id]?.(...payload)
    }
  }
  
  return { subscribe, publish, unsubscribe }
})();
