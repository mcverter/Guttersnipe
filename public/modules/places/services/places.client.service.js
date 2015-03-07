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
    [
    function() {
      function Place(data) {
        var self = this;
        self.data = data || {};
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
        }
      });
    }]
  );
})(window.angular, window._);

