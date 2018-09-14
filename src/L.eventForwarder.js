import L from 'leaflet';

let _options;
let _container;
let _prevTarget = null;

const EventForwarder = L.Class.extend({

	initialize: function (options) {
		_options = options;
	},

	enable: function() {
		_container = document.getElementsByClassName(`leaflet-${_options.containerName}-pane`)[0];
		if (_options.events.click === true) L.DomEvent.on(_options.map, 'click', this._handleClick, this);
		if (_options.events.mousemove === true) {
			L.DomEvent.on(_options.map, 'mousemove', this._throttle(this._handleMouseMove, _options.throttleMs, _options.throttleOptions), this);
		}
	},

	disable: function() {
		L.DomEvent.off(_options.map, 'click', this._handleClick, this);
	},

	_handleMouseMove: function(event) {

		if (event.originalEvent._stopped) { return; }

		// get the target pane
		var currentTarget = event.originalEvent.target;
		var stopped;
		var removed;

		// hide the target node
		removed = { node: currentTarget, pointerEvents: currentTarget.style.pointerEvents };
		currentTarget.style.pointerEvents = 'none';

		// attempt to grab the next layer below
		const nextTarget = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY);
		const isCanvas = nextTarget.nodeName.toLowerCase() === 'canvas';

		// mouseout previous
		if (_prevTarget && _prevTarget != nextTarget) {
			_prevTarget.dispatchEvent(new MouseEvent('mouseout', event.originalEvent));
		}
		_prevTarget = nextTarget;

		// we keep drilling down until we get stopped,
		// or we reach the map container itself
		if (
			nextTarget &&
			nextTarget.nodeName.toLowerCase() !== 'body' &&
			nextTarget.classList.value.indexOf('leaflet-container') === -1
		) {
			let eventType = isCanvas ? 'mousemove' : 'mouseover';
			var ev = new MouseEvent(eventType, event.originalEvent);
			stopped = !nextTarget.dispatchEvent(ev);
			if (stopped || ev._stopped) {
				L.DomEvent.stop(event);
			}
		}

		// restore pointerEvents
		removed.node.style.pointerEvents = removed.pointerEvents;
	},

	_handleClick: function(event) {

		if (event.originalEvent._stopped) { return; }

		// get the target pane
		var currentTarget = event.originalEvent.target;
		var stopped;
		var removed;

		// hide the target node
		removed = { node: currentTarget, pointerEvents: currentTarget.style.pointerEvents };
		currentTarget.style.pointerEvents = 'none';

		// attempt to grab the next layer below
		let nextTarget = document.elementFromPoint(event.originalEvent.clientX, event.originalEvent.clientY);

		// we keep drilling down until we get stopped,
		// or we reach the map container itself
		if (
			nextTarget &&
			nextTarget.nodeName.toLowerCase() !== 'body' &&
			nextTarget.classList.value.indexOf('leaflet-container') === -1
		) {
			var ev = new MouseEvent(event.originalEvent.type, event.originalEvent);
			stopped = !nextTarget.dispatchEvent(ev);
			if (stopped || ev._stopped) {
				L.DomEvent.stop(event);
			}
		}

		// restore pointerEvents
		removed.node.style.pointerEvents = removed.pointerEvents;
	},

	/**
	 * Pinched from underscore
	 * @param func
	 * @param wait
	 * @param options
	 * @returns {Function}
	 * @private
	 */
	_throttle: function (func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : Date.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = Date.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	}


});

L.eventForwarder = function (options) {
	return new EventForwarder(options);
};

export default L.eventForwarder;