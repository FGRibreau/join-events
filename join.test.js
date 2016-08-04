'use strict';

const EventEmitter2 = require('eventemitter2').EventEmitter2;
const t = require('chai').assert;
const sinon = require('sinon');

const join = require('.');

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
