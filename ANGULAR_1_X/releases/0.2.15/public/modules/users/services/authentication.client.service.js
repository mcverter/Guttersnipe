/**
 * @class Authentications (Factory):
 * Returns an object containing all the Novantas Authentications,
 in the Microsoft ui.Authentications table
 *
 * Private
 * --------
 * @field authenticationFactory:  Returned object
 * @field authentications:  List of Authentications
 * @field afterLoadEventKey : Trigger for reloading the authentications from the server
 *                            and updating the factory
 * @method initialize : Initializes to authentications object
 * @method getTemplateIds:  Returns the authentications which are Templates for new authentications
 * @method loadAuthentication(authenticationId):
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(authenticationId)
 * @method templates()
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Authentications factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Authentication factory
 * $api.authentications.onUpdate(): Provides callback to $api
 *                  for updating Authentication factory
 *


 */

/**
 * @class Authentications (Factory):
 * Returns an object containing all the Novantas Authentications,
 in the Microsoft ui.Authentications table
 *
 * Private
 * --------
 * @field authenticationFactory:  Returned object
 * @field authentications:  List of Authentications
 * @field afterLoadEventKey : Trigger for reloading the authentications from the server
 *                            and updating the factory
 * @method initialize : Initializes to authentications object
 * @method loadAuthentication(authenticationId):
 * @addToAuthentications
 * @removeFromAuthentications
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(authenticationId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Authentications factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Authentication factory
 * $api.authentications.onUpdate(): Provides callback to $api
 *                  for updating Authentication factory
 *
 */


/**
 * Class Authentication:
 * Object representing a Novantas Authentication, a row in the Microsoft ui.Authentications table
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

// Authentication service for user variables
  angular.module('users').factory('Authentication', [
    function() {
      var _this = this;

      _this._data = {
        user: window.user
      };

      return _this._data;
    }
  ]);
})(window.angular, window._);