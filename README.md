# Join-events

> Join events stream compatible with Event Emitter-like APIs... use it when you don't have access to something like RxJS/BaconJS.


```javascript
const eventEmitter = new EventEmitter();
const join = require('join-events');

// join(eventEmitter, ...eventNames, f(...lastValues))
join(eventEmitter, 'event1', 'event2', (lastEvent1Value, lastEvent2Value) => {
  console.log(lastEvent1Value, lastEvent2Value);
});

eventEmitter.emit('event1', true); // do nothing because `event2` was never triggered
eventEmitter.emit('event2', false); // will log (true, false)
eventEmitter.emit('event2', true); // will log (true, true)
eventEmitter.emit('event2', 1, 2, 3); // will log (true, [1, 2, 3])
eventEmitter.emit('event1', false); // will log (true, [1, 2, 3])
```
>>>>>>> initial commit
