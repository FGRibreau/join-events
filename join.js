// (em, ...rest, f)
function join(source, ...rest) {
  const f = rest.pop();
  const eventNames = rest;

  // sentinel
  const EVENT_NOT_SET = {};

  // contains last values for each events, if equals to "EVENT_NOT_SET" it means the events was never received
  const lastValues = eventNames.map(() => EVENT_NOT_SET);

  eventNames.forEach((event, i) => {
    source.on(event, function(...args) {
      lastValues[i] = args.length > 1 ? args : args[0];

      if(lastValues.every(val => val !== EVENT_NOT_SET)){
        f.apply(null, lastValues);
      }
    });
  });
}

module.exports = join;
