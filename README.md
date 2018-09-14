# leaflet-event-forwarder

Catches unhandled canvas layer events and re-dispatches them to the next pane in a container.



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