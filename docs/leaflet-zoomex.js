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
            zoomOutHtml: "&#8722",  // −
            zoomInHtml: "&#43;",  // +
            zoomOutTitle: "Zoom Out",
            zoomInTitle: "Zoom In",
            afterZoomEnd: null,
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        onAdd: function (map) {
            this._map = map;

            let container = L.DomUtil.create("div", "leaflet-zoomex");
            if (this.options.className) L.DomUtil.addClass(container, this.options.className);

            this._zoomOutButton = this._createButton(this.options.zoomOutHtml, this.options.zoomOutTitle, "leaflet-zoomex-out", container, this._zoomOut);

            this._sliderContainer = L.DomUtil.create("div", "leaflet-zoomex-slider-container", container);
            L.DomEvent.disableClickPropagation(this._sliderContainer);

            this._slider = L.DomUtil.create("input", "leaflet-zoomex-slider", this._sliderContainer);
            this._slider.type = "range";
            this._slider.min = map.getMinZoom();
            this._slider.max = map.getMaxZoom();
            this._slider.step = 1;
            this._slider.value = map.getZoom();
            L.DomEvent.on(this._slider, "change", this._onSliderInput, this);
            map.on("zoomend", this._updateSlider, this);

            this._zoomInButton = this._createButton(this.options.zoomInHtml, this.options.zoomInTitle, "leaflet-zoomex-in", container, this._zoomIn);

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
            if (this.options.afterZoomEnd) this.options.afterZoomEnd();
        },

        _createButton: function (innerHTML, title, className, container, callback) {
            let button = L.DomUtil.create("button", className, container);
            button.innerHTML = innerHTML;
            button.title = title;

            L.DomEvent
                .on(button, "click", L.DomEvent.stopPropagation)
                .on(button, "click", L.DomEvent.preventDefault)
                .on(button, "click", callback, this);

            L.DomEvent.disableClickPropagation(button);

            return button;
        },
    });
});
