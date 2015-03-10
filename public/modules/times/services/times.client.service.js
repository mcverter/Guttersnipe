/**
 * @class Times (Factory):
 * Returns an object containing all the Novantas Times,
 in the Microsoft ui.Times table
 *
 * Private
 * --------
 * @field timeFactory:  Returned object
 * @field times:  List of Times
 * @field afterLoadEventKey : Trigger for reloading the times from the server
 *                            and updating the factory
 * @method initialize : Initializes to times object
 * @method loadTime(timeId):
 * @addToTimes
 * @removeFromTimes
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(timeId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Times factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Time factory
 * $api.times.onUpdate(): Provides callback to $api
 *                  for updating Time factory
 *
 */


/**
 * Class Time:
 * Object representing a Novantas Time, a row in the Microsoft ui.Times table
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

  angular.module('times').factory('Times',
    function() {

      Time.prototype = Object.create(Object.prototype, {
      });

    }
  );
})(window.angular, window._);

