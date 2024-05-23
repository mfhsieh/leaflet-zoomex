/* 
 * Leaflet Control ZoomEx v0.1 - 2024-05-24 
 * 
 * Copyright 2024 mfhsieh
 * mfhsieh@gmail.com 
 * 
 * Licensed under the MIT license. 
 * 
 * Demos: 
 * https://mfhsieh.github.io/leaflet-zoomex/
 * 
 * Source: 
 * git@github.com:mfhsieh/leaflet-zoomex.git 
 * 
 */
"use strict";

(function (factory) {
    if (typeof define === "function" && define.amd)
        define(["leaflet"], factory);
    else if (typeof module !== "undefined")
        module.exports = factory(require("leaflet"));
    else {
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first";
        factory(window.L);
    }
})(function (L) {

    L.Control.ZoomEx = L.Control.extend({

        options: {
            className: "",
            zoomOutHtml: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M 8,0.5 C 3.8568547,0.5 0.5,3.8568547 0.5,8 c 0,4.143145 3.3568547,7.5 7.5,7.5 4.143145,0 7.5,-3.356855 7.5,-7.5 C 15.5,3.8568547 12.143145,0.5 8,0.5 Z M 4.0080641,9.2096779 c -0.1995968,0 -0.3629027,-0.1633059 -0.3629027,-0.3629027 V 7.1532256 c 0,-0.1995969 0.1633059,-0.3629027 0.3629027,-0.3629027 h 7.9838719 c 0.199597,0 0.362903,0.1633058 0.362903,0.3629027 v 1.6935488 c 0,0.1995969 -0.163306,0.3629027 -0.362903,0.3629027 z" /></svg>',
            zoomInHtml: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M 8,0.5 C 3.8568547,0.5 0.5,3.8568546 0.5,7.9999998 0.5,12.143145 3.8568547,15.5 8,15.5 c 4.143145,0 7.5,-3.356855 7.5,-7.5000002 C 15.5,3.8568546 12.143145,0.5 8,0.5 Z m 4.354838,8.3467742 c 0,0.1995969 -0.163306,0.3629027 -0.362902,0.3629027 H 9.2096779 v 2.7822581 c 0,0.199597 -0.1633058,0.362902 -0.3629027,0.362902 H 7.1532256 c -0.1995968,0 -0.3629027,-0.163302 -0.3629027,-0.362902 V 9.2096773 H 4.0080653 c -0.1995968,0 -0.3629027,-0.1633058 -0.3629027,-0.3629027 V 7.1532255 c 0,-0.1995968 0.1633059,-0.3629027 0.3629027,-0.3629027 H 6.7903229 V 4.0080641 c 0,-0.1995969 0.1633059,-0.3629027 0.3629027,-0.3629027 h 1.6935488 c 0.1995969,0 0.3629027,0.1633062 0.3629027,0.3629027 v 2.782258 h 2.7822579 c 0.199597,0 0.362902,0.1633058 0.362902,0.3629027 z" /></svg>',
            zoomOutTitle: "Map Zoom Out",
            zoomInTitle: "Map Zoom In",
            sliderTitle: "Map Zoom In / Zoom Out Slider",
            zoomOutAriaLabel: "Map Zoom Out",
            zoomInAriaLabel: "Map Zoom In",
            sliderAriaLabel: "Map Zoom In / Zoom Out Slider",
            afterZoomEnd: null,
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        onAdd: function (map) {
            this._map = map;

            let container = L.DomUtil.create("div", "leaflet-zoomex");
            if (this.options.className) L.DomUtil.addClass(container, this.options.className);

            this._zoomOutButton = this._createButton(this.options.zoomOutHtml, "leaflet-zoomex-out", container, this._zoomOut, this.options.zoomOutTitle, this.options.zoomOutAriaLabel);

            this._sliderContainer = L.DomUtil.create("div", "leaflet-zoomex-slider-container", container);
            L.DomEvent.disableClickPropagation(this._sliderContainer);

            this._slider = L.DomUtil.create("input", "leaflet-zoomex-slider", this._sliderContainer);
            this._slider.type = "range";
            this._slider.min = map.getMinZoom();
            this._slider.max = map.getMaxZoom();
            this._slider.value = map.getZoom();
            this._slider.step = 1;

            this._slider.title = this.options.sliderTitle;
            this._slider.setAttribute("aria-label", this.options.sliderAriaLabel);
            this._slider.setAttribute("aria-valuemin", this._slider.min);
            this._slider.setAttribute("aria-valuemax", this._slider.max);
            this._slider.setAttribute("aria-valuenow", this._slider.value);

            L.DomEvent.on(this._slider, "change", this._onSliderInput, this);
            map.on("zoomend", this._updateSlider, this);

            this._zoomInButton = this._createButton(this.options.zoomInHtml, "leaflet-zoomex-in", container, this._zoomIn, this.options.zoomInTitle, this.options.zoomOutAriaLabel);

            return container;
        },

        _zoomOut: function () {
            this._map.zoomOut();
        },

        _zoomIn: function () {
            this._map.zoomIn();
        },

        _onSliderInput: function () {
            this._map.setZoom(this._slider.value);
        },

        _updateSlider: function () {
            this._slider.value = this._map.getZoom();
            this._slider.setAttribute("aria-valuenow", this._slider.value);
            if (this.options.afterZoomEnd) this.options.afterZoomEnd();
        },

        _createButton: function (innerHTML, className, container, callback, title, ariaLabel) {
            let button = L.DomUtil.create("button", className, container);
            button.innerHTML = innerHTML;

            button.title = title;
            button.setAttribute("aria-label", ariaLabel);

            L.DomEvent
                .on(button, "click", L.DomEvent.stopPropagation)
                .on(button, "click", L.DomEvent.preventDefault)
                .on(button, "click", callback, this);

            L.DomEvent.disableClickPropagation(button);

            return button;
        },
    });
});
