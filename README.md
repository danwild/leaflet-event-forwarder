# leaflet-event-forwarder [![NPM version][npm-image]][npm-url] [![NPM Downloads][npm-downloads-image]][npm-url]

A plugin for leaflet `v1^`.

Catches unhandled canvas layer events and re-dispatches them to the next layer in the stack.

## Example use:
```javascript
const map = L.map("map");
const myEventForwarder = new L.eventForwarder({
  // ref to leaflet map
  map: map,
  // events to forward
  events: {
    click: true,
    mousemove: true
  },
  // throttle options for mousemove events (same as underscore.js)
  throttleMs: 100,
  throttleOptions: {
    leading: true,
    trailing: false
  }
});

// enable event forwarding
myEventForwarder.enable();

// disable event forwarding
myEventForwarder.disable();
```

## Shouts outs
- Based largely on [this gist](https://gist.github.com/perliedman/84ce01954a1a43252d1b917ec925b3dd)
by [perliedman](https://gist.github.com/perliedman)

## License
Apache 2

[npm-image]: https://badge.fury.io/js/leaflet-event-forwarder.svg
[npm-url]: https://www.npmjs.com/package/leaflet-event-forwarder
[npm-downloads-image]: https://img.shields.io/npm/dt/leaflet-event-forwarder.svg