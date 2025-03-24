/*
 * Leaflet.ZoomEx v1.0.2 - 2025-03-23
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
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD module
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        // CommonJS module
        module.exports = factory(require("leaflet"));

    } else if (typeof window !== "undefined") {
        // Browser globals
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.ZoomEx = factory(window.L);
    }
})(function (L) {
    "use strict";

    /**
     * @class L.Control.ZoomEx
     * @extends L.Control
     * @classdesc A Leaflet control that adds zoom in/out buttons and a zoom slider.
     * @example
     * L.control.zoomEx().addTo(map);
     */    
    const ZoomEx = L.Control.extend({
        /**
         * @typedef {object} ZoomExOptions
         * @property {string} [className=""] - Custom CSS class name to assign to the zoom control container.
         * @property {string} [zoomOutHtml=`<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <path d="M 8,0.5 A 7.5,7.5 0 0 0 0.5,8 7.5,7.5 0 0 0 8,15.5 7.5,7.5 0 0 0 15.5,8 7.5,7.5 0 0 0 8,0.5 Z m -3.5,6 h 7 c 0.554,0 1,0.446 1,1 v 1 c 0,0.554 -0.446,1 -1,1 h -7 c -0.554,0 -1,-0.446 -1,-1 v -1 c 0,-0.554 0.446,-1 1,-1 z" /> </svg>`] - HTML content for the zoom out button.
         * @property {string} [zoomInHtml=`<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <path d="M 8,0.5 A 7.5,7.5 0 0 0 0.5,8 7.5,7.5 0 0 0 8,15.5 7.5,7.5 0 0 0 15.5,8 7.5,7.5 0 0 0 8,0.5 Z m -0.5,3 h 1 c 0.554,0 1,0.446 1,1 v 2 h 2 c 0.554,0 1,0.446 1,1 v 1 c 0,0.554 -0.446,1 -1,1 h -2 v 2 c 0,0.554 -0.446,1 -1,1 h -1 c -0.554,0 -1,-0.446 -1,-1 v -2 h -2 c -0.554,0 -1,-0.446 -1,-1 v -1 c 0,-0.554 0.446,-1 1,-1 h 2 v -2 c 0,-0.554 0.446,-1 1,-1 z" /> </svg>`] - HTML content for the zoom in button.
         * @property {string} [zoomOutTitle="Map Zoom Out"] - Title attribute for the zoom out button.
         * @property {string} [zoomInTitle="Map Zoom In"] - Title attribute for the zoom in button.
         * @property {string} [sliderTitle="Map Zoom In / Zoom Out Slider"] - Title attribute for the zoom slider.
         * @property {string} [zoomOutAriaLabel=""] - Aria-label attribute for the zoom out button.
         * @property {string} [zoomInAriaLabel=""] - Aria-label attribute for the zoom in button.
         * @property {string} [sliderAriaLabel=""] - Aria-label attribute for the zoom slider.
         * @property {function} [afterZoomEnd=null] - Callback function to be executed after the map zoom ends.
         */        
        options: {
            className: "",
            zoomOutHtml: `
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	<path d="M 8,0.5 A 7.5,7.5 0 0 0 0.5,8 7.5,7.5 0 0 0 8,15.5 7.5,7.5 0 0 0 15.5,8 7.5,7.5 0 0 0 8,0.5 Z m -3.5,6 h 7 c 0.554,0 1,0.446 1,1 v 1 c 0,0.554 -0.446,1 -1,1 h -7 c -0.554,0 -1,-0.446 -1,-1 v -1 c 0,-0.554 0.446,-1 1,-1 z" />
</svg>`,
            zoomInHtml: `
<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
	<path d="M 8,0.5 A 7.5,7.5 0 0 0 0.5,8 7.5,7.5 0 0 0 8,15.5 7.5,7.5 0 0 0 15.5,8 7.5,7.5 0 0 0 8,0.5 Z m -0.5,3 h 1 c 0.554,0 1,0.446 1,1 v 2 h 2 c 0.554,0 1,0.446 1,1 v 1 c 0,0.554 -0.446,1 -1,1 h -2 v 2 c 0,0.554 -0.446,1 -1,1 h -1 c -0.554,0 -1,-0.446 -1,-1 v -2 h -2 c -0.554,0 -1,-0.446 -1,-1 v -1 c 0,-0.554 0.446,-1 1,-1 h 2 v -2 c 0,-0.554 0.446,-1 1,-1 z" />
</svg>`,
            zoomOutTitle: "Map Zoom Out",
            zoomInTitle: "Map Zoom In",
            sliderTitle: "Map Zoom In / Zoom Out Slider",
            zoomOutAriaLabel: "",
            zoomInAriaLabel: "",
            sliderAriaLabel: "",
            afterZoomEnd: null,
        },

        /**
         * Initializes the control with the given options.
         * @param {ZoomExOptions} options - Control options.
         */
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        /**
         * Adds the control to the map.
         * @param {L.Map} map - The map to add the control to.
         * @returns {HTMLElement} The control container.
         */
        onAdd: function (map) {
            this._map = map;

            const container = L.DomUtil.create("div", "leaflet-zoomex");
            if (this.options.className) L.DomUtil.addClass(container, this.options.className);
            L.DomEvent.disableClickPropagation(container);

            this._zoomOutButton = this._createButton(this.options.zoomOutHtml, "leaflet-zoomex-out", container, this._zoomOut, this.options.zoomOutTitle, this.options.zoomOutAriaLabel);

            this._sliderContainer = L.DomUtil.create("div", "leaflet-zoomex-slider-container", container);
            this._slider = L.DomUtil.create("input", "leaflet-zoomex-slider", this._sliderContainer);
            this._slider.type = "range";
            this._slider.min = map.getMinZoom();
            this._slider.max = map.getMaxZoom();
            this._slider.value = map.getZoom();
            this._slider.step = 1;

            this._slider.title = this.options.sliderTitle;
            this._slider.setAttribute("aria-label", this.options.sliderAriaLabel ? this.options.sliderAriaLabel : this.options.sliderTitle);
            this._slider.setAttribute("aria-valuemin", this._slider.min);
            this._slider.setAttribute("aria-valuemax", this._slider.max);
            this._slider.setAttribute("aria-valuenow", this._slider.value);

            L.DomEvent.on(this._slider, "change", this._onSliderInput, this);
            map.on("zoomend", this._updateSlider, this);

            this._zoomInButton = this._createButton(this.options.zoomInHtml, "leaflet-zoomex-in", container, this._zoomIn, this.options.zoomInTitle, this.options.zoomOutAriaLabel);

            return container;
        },

        /**
         * Zooms the map out by one zoom level.
         * @private
         */
        _zoomOut: function () {
            this._map.zoomOut();
        },

        /**
         * Zooms the map in by one zoom level.
         * @private
         */
        _zoomIn: function () {
            this._map.zoomIn();
        },

        /**
         * Handles the slider input event and sets the map zoom level.
         * @private
         */
        _onSliderInput: function () {
            this._map.setZoom(this._slider.value);
        },

        /**
         * Updates the slider value and attributes based on the map zoom level.
         * @private
         */
        _updateSlider: function () {
            this._slider.value = this._map.getZoom();
            this._slider.setAttribute("aria-valuenow", this._slider.value);
            if (this.options.afterZoomEnd) this.options.afterZoomEnd();
        },

        /**
         * Creates a button element for the control.
         * @param {string} innerHTML - The HTML content of the button.
         * @param {string} className - The CSS class name of the button.
         * @param {HTMLElement} container - The parent container of the button.
         * @param {function} callback - The event listener function for the button click.
         * @param {string} title - The title attribute of the button.
         * @param {string} ariaLabel - The aria-label attribute of the button.
         * @returns {HTMLElement} The created button element.
         * @private
         */
        _createButton: function (innerHTML, className, container, callback, title, ariaLabel) {
            const button = L.DomUtil.create("button", className, container);
            button.innerHTML = innerHTML;

            button.title = title;
            button.setAttribute("aria-label", ariaLabel ? ariaLabel : title);

            L.DomEvent.on(button, "click", callback, this);

            return button;
        },
    });

    /**
     * Factory function to create a new ZoomEx control.
     * @param {ZoomExOptions} options - Control options.
     * @returns {L.Control.ZoomEx} A new ZoomEx control.
     */
    L.control.zoomEx = function (options) {
        return new ZoomEx(options);
    };

    return ZoomEx;
});
