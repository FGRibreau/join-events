'use strict';

const EventEmitter2 = require('eventemitter2').EventEmitter2;
const t = require('chai').assert;
const sinon = require('sinon');

// (em, ...rest, f)
function join(source, ...rest) {
  const f = rest.pop();
  const eventNames = rest;

  // sentinel
  const EVENT_NOT_SET = {};

  // contains last values for each events, if equals to "EVENT_NOT_SET" it means the events was never received
  const lastValues = eventNames.map(() => EVENT_NOT_SET);

  eventNames.forEach((event, i) => {
    source.on(event, (...args) => {
      lastValues[i] = args.length > 1 ? args : args[0];

      if(lastValues.every(val => val !== EVENT_NOT_SET)){
        f.apply(null, lastValues);
      }
    });
  });
}

describe('join', () => {
  const E1 = 'E1';
  const E2 = 'E2';
  const E3 = 'E3';
  let dispatcher;

  beforeEach(() => {
    dispatcher = new EventEmitter2();
  });

  describe('with 1 event', () => {

    it('should call the callback once we get an event', () => {
      const handler = sinon.spy((lastE1Value) => {
        t.strictEqual(lastE1Value, E1);
      });
      join(dispatcher, E1, handler);

      t.strictEqual(handler.callCount, 0);
      dispatcher.emit(E1, E1);
      t.strictEqual(handler.callCount, 1);
    });

    it('should call the callback with the last value each time we get an event', () => {
      const handler = sinon.spy((lastE1Value) => {
        if (handler.callCount === 1) {
          t.strictEqual(lastE1Value, E1);
        }
        if (handler.callCount === 2) {
          t.strictEqual(lastE1Value, E2);
        }
        if (handler.callCount === 3) {
          t.strictEqual(lastE1Value, E3);
        }
      });

      join(dispatcher, E1, handler);
      t.strictEqual(handler.callCount, 0);
      dispatcher.emit(E1, E1);
      dispatcher.emit(E1, E2);
      dispatcher.emit(E1, E3);
      t.strictEqual(handler.callCount, 3);
    });
  });

  describe('with 2 events', () => {
    it('should call the callback with the last value each time we get an event', () => {
      const handler = sinon.spy((lastE1Value, lastE2Value) => {
        if (handler.callCount === 1) {
          t.strictEqual(lastE1Value, E1);
          t.strictEqual(lastE2Value, E2);
        }
        if (handler.callCount === 2) {
          t.strictEqual(lastE1Value, E3);
          t.strictEqual(lastE2Value, E2);
        }
        if (handler.callCount === 3) {
          t.strictEqual(lastE1Value, E3);
          t.deepEqual(lastE2Value, [E1, E2, E3]);
        }
      });

      join(dispatcher, E1, E2, handler);
      dispatcher.emit(E1, E1);
      t.strictEqual(handler.callCount, 0);
      dispatcher.emit(E2, E2);
      t.strictEqual(handler.callCount, 1);
      dispatcher.emit(E1, E3);
      t.strictEqual(handler.callCount, 2);
      dispatcher.emit(E2, E1, E2, E3);
      t.strictEqual(handler.callCount, 3);
    });
  });
});
