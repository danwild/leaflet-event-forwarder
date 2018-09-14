# leaflet-event-forwarder [![NPM version][npm-image]][npm-url] [![NPM Downloads][npm-downloads-image]][npm-url]

A plugin for leaflet `v1^`.

Catches unhandled canvas layer events and re-dispatches them to the next pane in a container.

## Example use:
```javascript
const map = L.map("map");
// prepare a container to hold our z stackable layer panes
const container = map.createPane('stack-container');

const myEventForwarder = new L.eventForwarder({
	// ref to leaflet map
	map: map,
	// see comments below
	containerName: 'stack-container',
	// enable events
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

This plugin was built assuming a mildly non-standard layer structure, where layers are stacked using
panes nested within a 'container' pane (this structure also provides greater control for z stacking
layers which don't support zIndex, e.g. vectors that only support
[bringToFront](https://leafletjs.com/reference-1.3.4.html#path-bringtofront)).

```html
<div class="leaflet-pane custom-container-pane">

	<div class="leaflet-pane custom-pane">
		<div class="leaflet-layer">
			<canvas></canvas>
		</div>
	</div>

	<div class="leaflet-pane custom-pane">
        <div class="leaflet-layer">
            <canvas></canvas>
        </div>
    </div>

    <div class="leaflet-pane custom-pane">
        <div class="leaflet-layer">
            <svg></svg>
        </div>
    </div>

</div>
```

## License
Apache 2

[npm-image]: https://badge.fury.io/js/leaflet-event-forwarder.svg
[npm-url]: https://www.npmjs.com/package/leaflet-event-forwarder
[npm-downloads-image]: https://img.shields.io/npm/dt/leaflet-event-forwarder.svg