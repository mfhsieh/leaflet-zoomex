# Leaflet.ZoomEx

A [Leaflet](https://leafletjs.com/) plugin that displays a zoom control on the map, with a customizable appearance and position using CSS.

* Demo Page: [Leaflet 1 demo](https://mfhsieh.github.io/leaflet-zoomex/index.html) or [Leaflet 2 demo](https://mfhsieh.github.io/leaflet-zoomex/index_v2.html)
* Current Version: v1.0.3 / v2.0.0-alpha.1 (2026-02-28)
* Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

## Usage

### Leaflet 1.x (Classic)

Simply include the [JS](dist/leaflet-zoomex.min.js) and [CSS](examples/demo.css) in the head.

```html
<head>
    ...
    <script src="dist/leaflet-zoomex.min.js"></script>
    <link rel="stylesheet" href="examples/demo.css" />
    ...
</head>
```

Then create a `ZoomEx` instance and add it to the map.

```js
new L.Control.ZoomEx({
    className: "leaflet-zoomex-rightcenter",
}).addTo(map);
```

### Leaflet 2.x (ESM)

For Leaflet 2.x, use the ESM-ready version [leaflet-zoomex_v2.js](dist/leaflet-zoomex_v2.min.js).

```js
import L from 'leaflet';
import ZoomEx from './dist/leaflet-zoomex_v2.min.js';

const map = new L.Map('map', { zoomControl: false });

new ZoomEx({
    position: "topleft",
    className: "leaflet-zoomex-topleft",
}).addTo(map);
```

For more details, refer to the [Leaflet 1 demo](index.html) or [Leaflet 2 demo](index_v2.html).

## Options

| Option | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| className | String | "" | Custom CSS class name to assign to the zoom control container. |
| zoomInHtml | String | (SVG) | HTML content for the zoom in button. |
| zoomOutHtml | String | (SVG) | HTML content for the zoom out button. |
| zoomInTitle | String | "Map Zoom In" | Title attribute for the zoom in button. |
| zoomOutTitle | String | "Map Zoom Out" | Title attribute for the zoom out button. |
| sliderTitle | String | "Map Zoom In / Zoom Out Slider" | Title attribute for the zoom slider. |
| zoomInAriaLabel | String | "" | Aria-label attribute for the zoom in button. (Defaults to `zoomInTitle` if empty) |
| zoomOutAriaLabel | String | "" | Aria-label attribute for the zoom out button. (Defaults to `zoomOutTitle` if empty) |
| sliderAriaLabel | String | "" | Aria-label attribute for the zoom slider. (Defaults to `sliderTitle` if empty) |
| afterZoomEnd | Function | null | Callback function to be executed after the map zoom ends. |

## Where

* Source Code: [GitHub](https://github.com/mfhsieh/leaflet-zoomex)

## Author

* email: mfhsieh at gmail.com
* Github: [GitHub](https://github.com/mfhsieh/)
