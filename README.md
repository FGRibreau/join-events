# Join-events

[![Build Status](https://img.shields.io/circleci/project/FGRibreau/join-events.svg)](https://circleci.com/gh/FGRibreau/join-events/) [![Deps](	https://img.shields.io/david/FGRibreau/join-events.svg)](https://david-dm.org/FGRibreau/join-events) [![NPM version](https://img.shields.io/npm/v/join-events.svg)](http://badge.fury.io/js/join-events) [![Downloads](http://img.shields.io/npm/dm/join-events.svg)](https://www.npmjs.com/package/join-events) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg) [![Twitter Follow](https://img.shields.io/twitter/follow/fgribreau.svg?style=flat)](https://twitter.com/FGRibreau) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/francois-guillaume-ribreau?utm_source=github&utm_medium=button&utm_term=francois-guillaume-ribreau&utm_campaign=github) 

> Join events stream compatible with Event Emitter-like APIs... use it when you don't have access to something like RxJS/BaconJS.

# NPM

```
npm i join-events -S
```

# Usage


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

# [Changelog](/CHANGELOG.md)
