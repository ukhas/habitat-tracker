goog.provide('habitat.tracker.BalloonMarker');

goog.require('goog.object');



/**
 * Creates a new BalloonMarker.
 *
 * @this {habitat.tracker.BalloonMarker}
 * @extends {google.maps.Marker} google.maps.Marker
 * @param {Object.<string, *>=} opt_options MarkerOptions.
 * @see <a href="https://developers.google.com/maps/documentation/javascript
 * /reference#MarkerOptions">google.maps.MarkerOptions</a>
 * @constructor
 * @export
 */
habitat.tracker.BalloonMarker = function(opt_options) {
  var options = {
    optimized: false, // make retina images work
    altitude: 0,
    image: null,
    shadow: /** @type {string} */ {
      url: 'images/markers/shadow.png',
      anchor: new google.maps.Point(
          habitat.tracker.BalloonMarker.SHADOW_SIZE_.width / 2,
          habitat.tracker.BalloonMarker.SHADOW_SIZE_.height / 2),
      scaledSize: habitat.tracker.BalloonMarker.SHADOW_SIZE_
    }
  };
  goog.object.extend(options, opt_options || {});

  google.maps.Marker.call(this, options);
};
goog.inherits(habitat.tracker.BalloonMarker, google.maps.Marker);


/**
 * Shadow image size
 * @const
 * @private
 */
habitat.tracker.BalloonMarker.SHADOW_SIZE_ =
    new google.maps.Size(48 / 2, 32 / 2); // retina


/**
 * Sets altitude of the balloon.
 *
 * @param {number} altitude Altitude in meters.
 * @export
 */
habitat.tracker.BalloonMarker.prototype.setAltitude = function(altitude) {
  this.set('altitude', altitude);
};


/**
 * Gets the altitude of the balloon.
 *
 * @return {number} Altitude in meters.
 */
habitat.tracker.BalloonMarker.prototype.getAltitude = function() {
  return /** @type {number} */ this.get('altitude');
};


/**
 * Sets image of the balloon.
 *
 * @param {string} image URL of the image.
 * @export
 */
habitat.tracker.BalloonMarker.prototype.setImage = function(image) {
  this.set('image', image);
};


/**
 * Gets the balloon image.
 *
 * @return {string} URL of the image.
 */
habitat.tracker.BalloonMarker.prototype.getImage = function() {
  return /** @type {string} */ this.get('image');
};


/**
 * Called by MVCObject when image is changed.
 *
 * @protected
 * @export
 */
habitat.tracker.BalloonMarker.prototype.image_changed = function() {
  var image_ = /** @type {string} */ this.get('image');
  var this_ = this;
  this.getImageSize_(image_, function(width, height) {
    this_.image_size_ = new google.maps.Size(width / 2, height / 2); // retina
    this_.setIcon(/** @type {google.maps.Icon} */ {
      url: image_,
      anchor: new google.maps.Point(
          this_.image_size_.width / 2,
          this_.image_size_.height + this_.getPixelAltitude_()),
      scaledSize: this_.image_size_
    });
  });
};


/**
 * Called by MVCObject when image is changed.
 *
 * @protected
 * @export
 */
habitat.tracker.BalloonMarker.prototype.altitude_changed = function() {
  if (this.image_size_ == undefined || this.image_size_ == null)
    return;
  var altitude = /** @type {number} */ this.get('altitude');
  var icon = /** @type {google.maps.Icon} */ this.getIcon();
  icon.anchor = new google.maps.Point(
      this.image_size_.width / 2,
      this.image_size_.height + this.getPixelAltitude_());
};


/**
 * Retrieves image size.
 *
 * @param {string} src Image URL.
 * @param {function(number, number)} func
 *        Function called when image size is retrieved.
 * @private
 */
habitat.tracker.BalloonMarker.prototype.getImageSize_ = function(src, func) {
  var img = new Image();
  img.src = src;
  img.onload = function() {
    if (func != undefined && func != null)
      func(img.width, img.height);
  };
};


/**
 * Gets the altitude of the balloon in pixels.
 *
 * @return {number} Altitude in pixels.
 * @private
 */
habitat.tracker.BalloonMarker.prototype.getPixelAltitude_ = function() {
  var altitude = /** @type {number} */ this.get('altitude');
  return Math.round(altitude / (1000 / 3) * (this.getMap().getZoom() / 18.0));
};
