goog.provide('habitat.tracker.Map');

goog.require('goog.object');



/**
 * Creates an instance of a Map.
 *
 * @this {habitat.tracker.Map}
 * @extends {google.maps.Map} google.maps.Map
 * @param {HTMLElement} element DOM element that should be used for the map.
 * @param {Object.<string, *>=} opt_options MapOptions.
 * @see <a href="https://developers.google.com/maps/documentation/javascript
 * /reference#MapOptions">google.maps.MapOptions</a>
 * @constructor
 * @export
 */
habitat.tracker.Map = function(element, opt_options) {
  var options = {
    center: new google.maps.LatLng(52, 0.5),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  goog.object.extend(options, opt_options || {});

  google.maps.Map.call(this, element, options);
};
goog.inherits(habitat.tracker.Map, google.maps.Map);


/**
 * Converts from LatLng to pixel position.
 *
 * @export
 * @this {habitat.tracker.Map}
 * @param {google.maps.LatLng} position Position to convert.
 * @return {google.maps.Point} Pixel position.
 */
habitat.tracker.Map.prototype.fromLatLngToPixel = function(position) {
  var scale = Math.pow(2, this.getZoom());
  var proj = this.getProjection();
  var bounds = this.getBounds();

  var nw = proj.fromLatLngToPoint(
      new google.maps.LatLng(
          bounds.getNorthEast().lat(),
          bounds.getSouthWest().lng()
      ));
  var point = proj.fromLatLngToPoint(position);

  return new google.maps.Point(
      Math.floor((point.x - nw.x) * scale),
      Math.floor((point.y - nw.y) * scale));
};


/**
 * Converts from pixel position to LatLng.
 *
 * @export
 * @this {habitat.tracker.Map}
 * @param {google.maps.Point} pixel Position to convert.
 * @return {google.maps.LatLng} LatLng position.
 */
habitat.tracker.Map.prototype.fromPixelToLatLng = function(pixel) {
  var scale = Math.pow(2, this.getZoom());
  var proj = this.getProjection();
  var bounds = this.getBounds();

  var nw = proj.fromLatLngToPoint(
      new google.maps.LatLng(
          bounds.getNorthEast().lat(),
          bounds.getSouthWest().lng()
      ));
  var point = new google.maps.Point(
      pixel.x / scale + nw.x,
      pixel.y / scale + nw.y);

  return proj.fromPointToLatLng(point);
};
