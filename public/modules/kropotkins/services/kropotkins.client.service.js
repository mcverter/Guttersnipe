/**
 * @class Kropotkins (Factory):
 * Returns an object containing all the Novantas Kropotkins,
 in the Microsoft ui.Kropotkins table
 *
 * Private
 * --------
 * @field kropotkinFactory:  Returned object
 * @field kropotkins:  List of Kropotkins
 * @field afterLoadEventKey : Trigger for reloading the kropotkins from the server
 *                            and updating the factory
 * @method initialize : Initializes to kropotkins object
 * @method getTemplateIds:  Returns the kropotkins which are Templates for new kropotkins
 * @method loadKropotkin(kropotkinId):
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(kropotkinId)
 * @method templates()
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Kropotkins factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Kropotkin factory
 * $api.kropotkins.onUpdate(): Provides callback to $api
 *                  for updating Kropotkin factory
 *


 */


/**
 * Class Kropotkin:
 * Object representing a Novantas Kropotkin, a row in the Microsoft ui.Kropotkins table
 *
 * @field data:
 * @field state:
 * @field id:
 * @field uri:
 * @field viewUri
 * @field label:
 * @field description
 * @field custom:
 * @field table:
 * @field controls
 * @field widgets:
 * @field filters:
 * @field isTemplate
 * @method $update(name, description):
 * @method $copy(label, description):
 * @method $delete
 */



(function (angular, _) {
  'use strict';

//Kropotkins service used to communicate Kropotkins REST endpoints
  angular.module('kropotkins').factory('Kropotkins', ['$resource',
    function($resource) {
      return $resource(
        'kropotkins/:kropotkinId',
        { kropotkinId: '@_id'}
      );
    }
  ]);
})(window.angular, window._);