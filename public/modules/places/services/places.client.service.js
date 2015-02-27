/**
 * @class Places (Factory):
 * Returns an object containing all the Places.
 *
 ** MongoDB guttersnipe.places Collection
 *
 * Private
 * --------
 * @field placeFactory:  Returned object
 * @field places:  List of Places
 * @field afterLoadEventKey : Trigger for reloading the
 *          places from the server
 *                            and updating the factory
 * @method initialize : Initializes the places [] Array
 * @method loadPlace({placeId, coordinates}):
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(placeId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Places factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Place factory
 * $api.places.onUpdate(): Provides callback to $api
 *                  for updating Place factory
 *


 */


(function (angular, _) {
  'use strict';

  angular.module('places').factory('Places',
    ['Geolocator',
    function(Geolocator) {
      var placeFactory = {},
        places = {},
        afterLoadEventKey = '$place.afterLoad',
        initialize = function $placeInitialize(state) {
          places = {};

          // places
          _.each(state.places, function (data, id) {
            places[id] = new Place(data);
          });

          //  _.trigger(afterLoadEventKey, placeFactory);

          $log.debug('$place Initialized', places);
          // return placeFactory;
        },
        loadPlace = function loadPlace(placeId) {
          var place = places[placeId];

          if (!place) {
            $log.error('Invalid placeId:', placeId, places);
            return $q.reject('Invalid placeId: ' + placeId);
          }

          return $api.jasper.place(place.uri).then(function (jasperData) {
            place.data = _.extend(place.data, jasperData);
            return place;
          });
        };

      function Place(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }

      /**
       * Class Place:
       * Object representing a Guttersnipe Place,
       * a row in the mongo guttersnipe.place Collection
       *
       * @field data:

       * @field id:
       * @field coordinates:
       * @field address:
       * @field description

       * @method $update(name, description):
       * @method $copy(label, description):
       * @method $delete
       */


      Place.prototype = Object.create(Object.prototype, {

        getCurrentPlace: {
          enumerable: true,
          value: function getCurrentPlace() {
            return window.navigator.location;
          }
        },
        id: {
          enumerable: true,
          get: function getId() {
            var self = this;
            return self.data.id;
          }
        },

        coordinates: {
          enumerable: true,
          get: function getCoordinates() {
            var self = this;
            return self.data.coordinates;
          }
        },

        address: {
          enumerable: true,
          get: function getAddress() {
            var self = this;
            return self.data.address;
          }
        },

        description: {
          enumerable: true,
          get: function getDescription() {
            var self = this;
            return self.data.description;
          }
        },


        filters: {
          enumerable: true,
          get: function getFilters() {
            var self = this;
            return self.data.filters;
          }
        },

        $update: {
          enumerable: true,
          value: function updatePlace(name, description) {
            var self = this;
            return $api.places.update(self.id, self.uri, name, description)
              .then (function $updatePlaceResponse() {
              $log.debug('Place Updated', self.data);
            });    }
        },

        $copy: {
          enumerable: true,
          value: function $copyPlace(label, description) {
            var self = this;
            return $api.places.copy(self.id, label, description).then(function $copyPlaceResponse(data) {
              $log.debug('Place Copied', data);
              var newPlace = new Place(data);
              places[newPlace.id] = newPlace;
              $log.debug('New Place', newPlace);
              return newPlace;
            });
          }
        },

        $delete: {
          enumerable: true,
          value: function $deletePlace() {
            var self = this;
            return $api.places.delete(self.id).then(function $deletePlaceResponse() {
              $log.debug('Place Deleted', self.data);
              delete places[self.id];
            });
          }
        }
      });

      placeFactory = Object.create(Object.prototype, {
        navigator: {
          enumerable: true,
          value: function getCurrentLoc() {
            return window.navigator.geolocation;
          }
        },
        all: {
          enumerable: true,
          get: function allPlaces() {
            return places;
          }
        },
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(places)) {
              $log.debug('Already loaded, triggering handler');
              handler(self);
            }
          }
        },
        get: {
          enumerable: true,
          value: function getPlace(placeId) {
            return loadPlace(placeId);
          }
        },
        getPlaceIdByCoordinates : {
          enumerable: true,
          value: function getPlaceIdByCoordinates(coordinates) {
          }
        }
      });
      return placeFactory;
    }]
  );
})(window.angular, window._);

