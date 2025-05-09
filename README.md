Leaflet.ZoomEx
=

A [Leaflet](https://leafletjs.com/) plugin that displays a zoom control on the map, with a customizable appearance and position using CSS.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-zoomex/)
* Current Version: v1.0.2
* Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.


# Usage

Simply include the [JS](dist/leaflet-zoomex.min.js) and [CSS](examples/demo.css) in the head.

```html
<head>
    ...
    <script src="dist/leaflet-zoomex.min.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And add the control to the map.

```js
new L.Control.ZoomEx({
    className: "leaflet-zoomex-rightcenter",
}).addTo(map);
```

For more details, refer to this [demo](https://mfhsieh.github.io/leaflet-zoomex/) (code: [index.html](index.html), [demo.css](examples/demo.css)).


# Options

| Option           | Type     | Default                                      | Description                                                                                                      |
| ---------------- | -------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| className        | String   | ""                                           | the custom CSS class name assigned to the control                                                                |
| afterZoomEnd     | Function | null                                         | the callback function after the "zoomend" event                                                                  |
| zoomOutHtml      | String   | refer to [zoom_out.svg](images/zoom_out.svg) | the HTML content of the zoom-out button                                                                          |
| zoomInHtml       | String   | refer to [zoom_in.svg](images/zoom_in.svg)   | the HTML content of the zoom-in button                                                                           |
| zoomOutTitle     | String   | "Map Zoom Out"                               | the "title" attribute of the zoom-out button                                                                     |
| zoomInTitle      | String   | "Map Zoom In"                                | the "title" attribute of the zoom-in button                                                                      |
| sliderTitle      | String   | "Map Zoom In / Zoom Out Slider"              | the "title" attribute of the zoom slider                                                                         |
| zoomOutAriaLabel | String   | ""                                           | the "aria-label" attribute of the zoom-out button. If it is an empty string, it will be equal to "zoomOutTitle". |
| zoomInAriaLabel  | String   | ""                                           | the "aria-label" attribute of the zoom-in button.  If it is an empty string, it will be equal to "zoomInTitle".  |
| sliderAriaLabel  | String   | ""                                           | the "aria-label" attribute of the zoom slider.  If it is an empty string, it will be equal to "sliderTitle".     |


# Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-zoomex)


# Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
