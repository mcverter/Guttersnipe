/**
 * @class Users (Factory):
 * Returns an object containing all the Novantas Users,
 in the Microsoft ui.Users table
 *
 * Private
 * --------
 * @field userFactory:  Returned object
 * @field users:  List of Users
 * @field afterLoadEventKey : Trigger for reloading the users from the server
 *                            and updating the factory
 * @method initialize : Initializes to users object
 * @method loadUser(userId):
 * @addToUsers
 * @removeFromUsers
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(userId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Users factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes User factory
 * $api.users.onUpdate(): Provides callback to $api
 *                  for updating User factory
 *
 */


/**
 * Class User:
 * Object representing a Novantas User, a row in the Microsoft ui.Users table
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

// Users service used for communicating with the users REST endpoint
  angular.module('users').factory('Users', ['$resource',
    function($resource) {
      return $resource('users', {}, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
})(window.angular, window._);