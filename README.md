Leaflet.Control.ZoomEx
=

A Leaflet plugin that displays a zoom control on the map, with a customizable appearance and position using CSS, tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-zoomex/)


# Usage

Simply include the [JS](https://github.com/mfhsieh/leaflet-zoomex/blob/main/src/leaflet-zoomex.js) and [CSS](https://github.com/mfhsieh/leaflet-zoomex/blob/main/examples/demo.css) in the head.

```
<head>
    ...
    <script src="leaflet-zoomex.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And adding the zoom control to the map.

```
new L.Control.ZoomEx({
    className: "leaflet-zoomex-rightcenter",
}).addTo(map);
```

For more examples, refer to this [demo](https://mfhsieh.github.io/leaflet-zoomex/) (code: [index.html](https://github.com/mfhsieh/leaflet-zoomex/blob/main/index.html), [demo.css](https://github.com/mfhsieh/leaflet-zoomex/blob/main/examples/demo.css)).


# Options

| Option           | Type     | Default                                                                                 | Description                                                                                                           |
| ---------------- | -------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| className        | String   | ""                                                                                      | A custom CSS class name to assign to the control.                                                                     |
| afterZoomEnd     | Function | null                                                                                    | The callback function after the "zoomend" event.                                                                      |
| zoomOutHtml      | String   | [zoom_out.svg](https://github.com/mfhsieh/leaflet-zoomex/blob/main/images/zoom_out.svg) | The HTML content of the zoom-out button.                                                                              |
| zoomInHtml       | String   | [zoom_in.svg](https://github.com/mfhsieh/leaflet-zoomex/blob/main/images/zoom_in.svg)   | The HTML content of the zoom-in button.                                                                               |
| zoomOutTitle     | String   | "Map Zoom Out"                                                                          | The title attribute of the zoom-out button.                                                                           |
| zoomInTitle      | String   | "Map Zoom In"                                                                           | The title attribute of the zoom-in button.                                                                            |
| sliderTitle      | String   | "Map Zoom In / Zoom Out Slider"                                                         | The title attribute of the zoom slider.                                                                               |
| zoomOutAriaLabel | String   | ""                                                                                      | The aria-label attribute of the zoom-out button. If its value is an empty string, it will be equal to "zoomOutTitle". |
| zoomInAriaLabel  | String   | ""                                                                                      | The aria-label attribute of the zoom-in button.  If its value is an empty string, it will be equal to "zoomInTitle".  |
| sliderAriaLabel  | String   | ""                                                                                      | The aria-label attribute of the zoom slider.  If its value is an empty string, it will be equal to "sliderTitle".     |


# Where

Source Code: [Github](https://github.com/mfhsieh/leaflet-zoomex)