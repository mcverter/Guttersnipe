/**
 * @class Places (Factory):
 * Returns an object containing all the Novantas Places,
 in the Microsoft ui.Places table
 *
 * Private
 * --------
 * @field placeFactory:  Returned object
 * @field places:  List of Places
 * @field afterLoadEventKey : Trigger for reloading the places from the server
 *                            and updating the factory
 * @method initialize : Initializes to places object
 * @method loadPlace(placeId):
 * @addToPlaces
 * @removeFromPlaces
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


/**
 * Class Place:
 * Object representing a Novantas Place, a row in the Microsoft ui.Places table
 *
 * @field data:  All data retreived from Mongo

 * @field id:  ObjectID
 * @field coordinates: Object {lat, lng}
 * @field address: String
 * @field description: String

 * @method $update(name, description):
 * @method $copy(label, description):
 * @method $delete
 */



(function (angular, _) {
  'use strict';

//Places service used to communicate Places REST endpoints
  angular.module('places').factory('Places', ['$resource',
    function($resource) {
      return $resource('places/:placeId', { placeId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
})(window.angular, window._);