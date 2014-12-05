(function (angular, $, _, google, JSON) {

  'use strict';

  angular.module('google-maps', ['google-loader', 'app-config', 'debug'])
      .factory('$googleMaps', ['$log', '$config',
        function $googleMaps($log, $config) {
          var version = $config.googleMaps.version || '3',
              configure = function () {
                $log.info('Configuring Google Maps SDK', google.maps.version);

                var Label = function Label(opts) {
                      var self = this;
                      self.setValues(opts);
                      self.$content = $('<span>')
                        .css({
                          position: 'relative',
                          left: '-50%',
                          top: '8px',
                          'white-space': 'nowrap',
                          border: '1px solid #000',
                          padding: '2px',
                          'background-color': '#FFF'
                        });
                      self.$wrapper = $('<div>')
                        .css({
                          position: 'absolute',
                          display: 'none',
                          'z-index': 1001
                        });
                      self.$wrapper.append(self.$content);
                    },
                    Tooltip = function Tooltip(opts) {
                      var self = this;
                      self.setValues(opts);
                      self.$container = $('<div>')
                        .css({
                          position: 'absolute',
                          display: 'none',
                          'z-index': 1001
                        });
                    },
                    Popover = function Popover(opts) {
                      var self = this;
                      self.setValues(opts);
                      self.$container = $('<div>')
                        .css({
                          position: 'absolute',
                          display: 'none',
                          'z-index': 1001
                        });
                    };

                // use latest google maps look & feel
                google.maps.visualRefresh = true;

                // extend google maps v3 so that identifying Polygon bounds is easier
                google.maps.Polygon.prototype.getBounds = function getBounds() {
                  var self = this,
                      bounds = new google.maps.LatLngBounds(),
                      paths = self.getPaths();

                  paths.forEach(function (path) {
                    path.forEach(function (latLng) {
                      bounds.extend(latLng);
                    });
                  });

                  return bounds;
                };

                google.maps.ext = {
                  Label: Label,
                  Tooltip: Tooltip,
                  Popover: Popover
                };

                google.maps.ext.Label.prototype = Object.create(google.maps.OverlayView.prototype, {
                  onAdd: {
                    writable: true,
                    configurable: true,
                    value: function onAdd() {
                      var self = this,
                          pane = self.getPanes().floatPane;
                      pane.appendChild(self.$wrapper.get(0));
                      self.redrawListeners = [
                        google.maps.event.addListener(self, 'position_changed', self.draw),
                        google.maps.event.addListener(self, 'text_changed', self.draw)
                      ];
                    }
                  },
                  onRemove: {
                    writable: true,
                    configurable: true,
                    value: function onRemove() {
                      var self = this;
                      self.$wrapper.remove();
                      _.each(self.redrawListeners, google.maps.event.removeListener);
                    }
                  },
                  draw: {
                    writable: true,
                    configurable: true,
                    value: function draw() {
                      var self = this,
                          projection = self.getProjection(),
                          position = projection.fromLatLngToDivPixel(self.get('position'));

                      self.$wrapper.css({
                        left: position.x + 'px',
                        top: position.y + 'px',
                        display: 'block'
                      });

                      self.$content.html(self.get('content'));
                    }
                  }
                });

                google.maps.ext.Tooltip.prototype = Object.create(google.maps.OverlayView.prototype, {
                  onAdd: {
                    writable: true,
                    configurable: true,
                    value: function onAdd() {
                      var self = this,
                          pane = self.getPanes().floatPane;

                      pane.appendChild(self.$container.get(0));

                      self.$container.tooltip({
                            title: self.get('content'),
                            html: true,
                            placement: 'top'
                          });

                      self.redrawListeners = [
                        google.maps.event.addListener(self, 'position_changed', self.draw),
                        google.maps.event.addListener(self, 'text_changed', self.draw)
                      ];
                    }
                  },
                  onRemove: {
                    writable: true,
                    configurable: true,
                    value: function onRemove() {
                      var self = this;

                      self.$container.tooltip('destroy');

                      _.each(self.redrawListeners, google.maps.event.removeListener);
                    }
                  },
                  draw: {
                    writable: true,
                    configurable: true,
                    value: function draw() {
                      var self = this,
                          projection = self.getProjection(),
                          position = projection.fromLatLngToDivPixel(self.get('position'));

                      self.$container.css({
                        left: position.x + 'px',
                        top: position.y + 'px',
                        display: 'block'
                      });

                      self.$container.tooltip('show');
                    }
                  }
                });

                google.maps.ext.Popover.prototype = Object.create(google.maps.OverlayView.prototype, {
                  onAdd: {
                    writable: true,
                    configurable: true,
                    value: function onAdd() {
                      var self = this,
                          pane = self.getPanes().floatPane;

                      pane.appendChild(self.$container.get(0));

                      self.$container.popover({
                            title: self.get('title'),
                            content: self.get('content'),
                            html: true,
                            placement: 'bottom'
                          });

                      self.redrawListeners = [
                        google.maps.event.addListener(self, 'position_changed', self.draw),
                        google.maps.event.addListener(self, 'text_changed', self.draw)
                      ];
                    }
                  },
                  onRemove: {
                    writable: true,
                    configurable: true,
                    value: function onRemove() {
                      var self = this;

                      self.$container.popover('destroy');

                      _.each(self.redrawListeners, google.maps.event.removeListener);
                    }
                  },
                  draw: {
                    writable: true,
                    configurable: true,
                    value: function draw() {
                      var self = this,
                          projection = self.getProjection(),
                          position = projection.fromLatLngToDivPixel(self.get('position'));

                      self.$container.css({
                        left: position.x + 'px',
                        top: position.y + 'px',
                        display: 'block'
                      });

                      self.$container.popover('show');
                    }
                  }
                });
              },
              parameters = _.extend({callback: configure}, $config.googleMaps.parameters);

          return google.load('maps', version, parameters)
              .then(function () { return google.maps; });
        }])
      .factory('$geoJson', ['$log', '$debug',
        function $geoJson($log, $debug) {
          function ParseGeoJsonException(message, source) {
            var self = this;

            self.message = message;
            self.source = source;

            $log.error(self.message, self.source);

            self.toString = function() {
              return self.message + ' - ' + JSON.stringify(self.source);
            };
          }

          var toGoogleLatLng = function toGoogleLatLng(position) {
                // http://www.geojson.org/geojson-spec.html#positions

                if (!_.isArray(position) || position.length < 2) {
                  throw new ParseGeoJsonException('A position is represented by an array of numbers. There must be at least two elements, and may be more. The order of elements must follow x, y, z order (easting, northing, altitude for coordinates in a projected coordinate reference system, or longitude, latitude, altitude for coordinates in a geographic coordinate reference system). Any number of additional elements are allowed -- interpretation and meaning of additional elements is beyond the scope of this specification.', position);
                }

                var x = position[0], //longitude
                    y = position[1], //latitude
//                  z = position[2], // altitude
//                  rest = _.reset(position, 3), //additional optional values
                    gLatLng = new google.maps.LatLng(y, x);

                gLatLng = _.extend(gLatLng, {geoJson: position});

                return gLatLng;
              },

              toGoogleMarkers = function toGoogleMarkers(points, gOpts) {
                // https://developers.google.com/maps/documentation/javascript/reference#Marker

                var toGoogleMarker = function toGoogleMarker(gLatLng) {
                  var gMarkerOpts = _.extend(gOpts, {position: gLatLng}),
                      gMarker = new google.maps.Marker(gMarkerOpts);

                  return gMarker;
                };

                return _.chain(points)
                    .map(toGoogleLatLng) // could probably compose here instead of mapping 2x
                    .map(toGoogleMarker)
                    .value();
              },

              toGooglePolylines = function toGooglePolylines(lineStrings, gOpts) {
                // https://developers.google.com/maps/documentation/javascript/reference#Polyline

                var lineStringToGooglePath = function lineStringToGooglePath(lineString) {
                      return _.map(lineString, toGoogleLatLng);
                    },

                    toGooglePolyLine = function toGooglePolyLine(path) {
                      var gPolylineOpts = _.extend(gOpts, {path: path}),
                          gPolyline = new google.maps.Polyline(gPolylineOpts);

                      return gPolyline;
                    };

                return _.chain(lineStrings)
                    .map(lineStringToGooglePath)
                    .map(toGooglePolyLine)
                    .value();
              },

              toGooglePolygon = function toGooglePolygon(polygons, gOpts) {
                // https://developers.google.com/maps/documentation/javascript/reference#Polygon

                var polygonToGooglePaths = function polygonToGooglePaths(lineStrings) {
                      return _.map(lineStrings, polygonSegmentToGooglePath);
                    },

                    polygonSegmentToGooglePath = function polygonSegmentToGooglePath(lineString) {
                      return _.map(lineString, toGoogleLatLng);
                    },

                    paths = _.chain(polygons)
                        .map(polygonToGooglePaths)
                        .flatten(true)
                        .value(),
                  
                    gPolygonOpts = _.extend(gOpts, {paths: paths});

                return new google.maps.Polygon(gPolygonOpts);
              },

              isGeometryCollection = function isGeometryCollection(geometryCollection) {
                // http://www.geojson.org/geojson-spec.html#geometry-collection

                return _.isObject(geometryCollection) &&
                  geometryCollection.type === 'GeometryCollection' &&
                  _.isArray(geometryCollection.geometries);
              },

              isGeometry = function isGeometry(geometry) {
                // http://www.geojson.org/geojson-spec.html#geojson-objects

                return isGeometryCollection(geometry) ||
                  (_.isObject(geometry) && _.has(geometry, 'type') && _.isArray(geometry.coordinates));
              },

              isFeature = function isFeature(feature) {
                // http://www.geojson.org/geojson-spec.html#feature-objects

                return _.isObject(feature) && feature.type === 'Feature' &&
                  (_.isNull(feature.geometry) || isGeometry(feature.geometry)) &&
                  (_.isNull(feature.properties) || _.isObject(feature.properties));
              },

              isFeatureCollection = function isFeatureCollection(featureCollection) {
                // http://www.geojson.org/geojson-spec.html#feature-collection-objects

                return _.isObject(featureCollection) &&
                  featureCollection.type === 'FeatureCollection' &&
                  _.isArray(featureCollection.features);
              },

              isGeoJson = function isGeoJson(geoJson) {
                // http://www.geojson.org/geojson-spec.html

                return isGeometry(geoJson) ||
                  isFeature(geoJson) ||
                  isFeatureCollection(geoJson);
              },

              parseFeatureCollection = function parseFeatureCollection(featureCollection, gOpts) {
                // http://www.geojson.org/geojson-spec.html#feature-collection-objects

                if (!isFeatureCollection(featureCollection)) {
                  throw new ParseGeoJsonException('An object of type "FeatureCollection" must have a member with the name "features". The value corresponding to "features" is an array. Each element in the array is a feature object as defined above.', featureCollection);
                }

                var gObjects = _.chain(featureCollection.features)
                    .map(function (f) {
                      return parseFeature(f, gOpts);
                    })
                    .reject(function (f) {
                      return _.isNull(f);
                    })
                    .value();
                gObjects = _.extend(gObjects, {geoJson: featureCollection});

                //$log.debug('Parsed GeoJSON Feature Collection', gObjects);

                return gObjects;
              },

              parseFeature = function parseFeature(feature, gOpts) {
                // http://www.geojson.org/geojson-spec.html#feature-objects

                if (!isFeature(feature)) {
                  throw new ParseGeoJsonException('A feature object must have a member with the name "geometry". The value of the geometry member is a geometry object as defined above or a JSON null value. A feature object must have a member with the name "properties". The value of the properties member is an object (any JSON object or a JSON null value).', feature);
                }

                if (!feature.geometry) {
                  $log.warn('Feature with no value for geometry', feature);
                  return null;
                }

                gOpts = _.extend(feature.properties.googleOptions, gOpts);

                var gObject = parseGeometry(feature.geometry, gOpts);
                gObject = _.extend(gObject, {geoJson: feature});

                return gObject;
              },

              parseGeometryCollection = function parseGeometryCollection(geometryCollection, gOpts) {
                // http://www.geojson.org/geojson-spec.html#geometry-collection

                if (!isGeometryCollection(geometryCollection)) {
                  throw new ParseGeoJsonException('A geometry collection must have a member with the name "geometries". The value corresponding to "geometries" is an array. Each element in this array is a GeoJSON geometry object.', geometryCollection);
                }

                var gObjects = _.map(geometryCollection.geometries, function (geometry) {
                  parseGeometry(geometry, gOpts);
                });
                gObjects = _.extend(gObjects, {geoJson: geometryCollection});
                return gObjects;
              },

              parsePoint = function parsePoint(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#point

                if (geometry.type !== 'Point') {
                  throw new ParseGeoJsonException('For type "Point", the "coordinates" member must be a single position.', geometry);
                }

                var gMarkers = toGoogleMarkers([geometry.coordinates], gOpts),
                  gMarker = _.first(gMarkers);
                gMarker = _.extend(gMarker, {geoJson: geometry});

                return gMarker;
              },

              parseMultiPoint = function parseMultiPoint(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#multipoint

                if (geometry.type !== 'MultiPoint') {
                  throw new ParseGeoJsonException('For type "MultiPoint", the "coordinates" member must be an array of positions.', geometry);
                }

                var gMarkers = toGoogleMarkers(geometry.coordinates, gOpts);
                gMarkers = _.extend(gMarkers, {geoJson: geometry});
                return gMarkers;
              },

              parseLineString = function parseLineString(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#linestring

                if (geometry.type !== 'LineString' && geometry.coordinates.length >= 2) {
                  throw new ParseGeoJsonException('For type "LineString", the "coordinates" member must be an array of two or more positions.', geometry);
                }

                var gPolylines = toGooglePolylines([geometry.coordinates], gOpts),
                  gPolyline = _.first(gPolylines);
                gPolyline = _.extend(gPolyline, { geoJson: geometry });
                return gPolyline;
              },

              parseMultiLineString = function parseMultiLineString(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#multilinestring

                if (geometry.type !== 'MultiLineString') {
                  throw new ParseGeoJsonException('For type "MultiLineString", the "coordinates" member must be an array of LineString coordinate arrays.', geometry);
                }

                var gPolylines = toGooglePolylines(geometry.coordinates, gOpts);
                gPolylines = _.extend(gPolylines, {geoJson: geometry});
                return gPolylines;
              },

              parsePolygon = function parsePolygon(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#polygon

                if (geometry.type !== 'Polygon') {
                  throw new ParseGeoJsonException('For type "Polygon", the "coordinates" member must be an array of LinearRing coordinate arrays. For Polygons with multiple rings, the first must be the exterior ring and any others must be interior rings or holes.', geometry);
                }

                var gPolygon = toGooglePolygon([geometry.coordinates], gOpts);
                gPolygon = _.extend(gPolygon, {geoJson: geometry});
                return gPolygon;
              },

              parseMultiPolygon = function parseMultiPolygon(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#multipolygon

                if (geometry.type !== 'MultiPolygon') {
                  throw new ParseGeoJsonException('For type "MultiPolygon", the "coordinates" member must be an array of Polygon coordinate arrays.', geometry);
                }

                var gPolygon = toGooglePolygon(geometry.coordinates, gOpts);
                gPolygon = _.extend(gPolygon, {geoJson: geometry});
                return gPolygon;
              },

              parseGeometry = function parseGeometry(geometry, gOpts) {
                // http://www.geojson.org/geojson-spec.html#geometry-objects

                if (!isGeometry(geometry)) {
                  throw new ParseGeoJsonException('geometry is invalid', geometry);
                }

                switch (geometry.type) {
                  case 'Point':
                    return parsePoint(geometry, gOpts);
                  case 'MultiPoint':
                    return parseMultiPoint(geometry, gOpts);
                  case 'LineString':
                    return parseLineString(geometry, gOpts);
                  case 'MultiLineString':
                    return parseMultiLineString(geometry, gOpts);
                  case 'Polygon':
                    return parsePolygon(geometry, gOpts);
                  case 'MultiPolygon':
                    return parseMultiPolygon(geometry, gOpts);
                  case 'GeometryCollection':
                    return parseGeometryCollection(geometry, gOpts);
                  default:
                    throw new ParseGeoJsonException('parser not registered for type', geometry);
                }
              },

              parse = function parse(geoJson, gOpts) {
                if (!isGeoJson(geoJson)) {
                  throw new ParseGeoJsonException('geoJson is invalid', geoJson);
                }

                gOpts = gOpts || {};

                try {
                  switch (geoJson.type) {
                    case 'Feature':
                      return parseFeature(geoJson, gOpts);
                    case 'FeatureCollection':
                      return parseFeatureCollection(geoJson, gOpts);
                    default:
                      return parseGeometry(geoJson, gOpts);
                  }
                } catch (e) {
                  if (e instanceof ParseGeoJsonException) {
                    e.source = geoJson;
                  }
                  throw e;
                }
              };

          $debug.$geoJson = parse;

          return parse;
        }])
      .directive('googleMap', ['$log', '$googleMaps',
        function googleMap($log, $googleMaps) {
          return {
            restrict: 'E',
            replace: false,
            scope: {
              initialize: '&initialize'
            },
            link: function link(scope, element) {
              $googleMaps.then(function () {
                var $element = $(element),
                    domElement = $element.get(0),
                    defaultOptions = {
                      zoom: 5,
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                scope.initialize({
                  fn: function (options) {
                    options = $.extend(defaultOptions, options);
                    $log.debug('Initializing Google Map', domElement, options);
                    var mapHeight = $(window).height() - ( $('#nova-header').outerHeight() + $('#nova-infobar').outerHeight() );
                    $log.debug('**********', mapHeight, $(window).height(), $('#nova-header').outerHeight(), $('#nova-infobar').outerHeight());
                    $('#nova-map').height(mapHeight);
                    scope.map = new google.maps.Map(domElement, options);

                    return scope.map;
                  }
                });
              });
            }
          };
        }]);

}) (window.angular, window.jQuery, window._, window.google, window.JSON);
