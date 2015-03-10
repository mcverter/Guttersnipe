/**
 * @class Resources (Factory):
 * Returns an object containing all the Novantas Resources,
 in the Microsoft ui.Resources table
 *
 * Private
 * --------
 * @field resourceFactory:  Returned object
 * @field resources:  List of Resources
 * @field afterLoadEventKey : Trigger for reloading the resources from the server
 *                            and updating the factory
 * @method initialize : Initializes to resources object
 * @method loadResource(resourceId):
 * @addToResources
 * @removeFromResources
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(resourceId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Resources factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Resource factory
 * $api.resources.onUpdate(): Provides callback to $api
 *                  for updating Resource factory
 *
 */


/**
 * Class Resource:
 * Object representing a Novantas Resource, a row in the Microsoft ui.Resources table
 *
 * @field data:  All data retreived from Mongo

 * @field id:  ObjectID
 * @field coordinates: Object {lat, lng}
 * @field address: String
 * @field description: String

 * @method $update(name, description):
 * @method $copy(label, description):
 * @method $delete



(function (angular, _) {
  'use strict';

  angular.module('resources').factory('Resources',
    function() {
      var resourceFactory = {},
        resources = {},
        afterLoadEventKey = '$resource.afterLoad',
        initialize = function $resourceInitialize(state) {
          resources = {};

          // resources
          _.each(state.resources, function (data, id) {
            resources[id] = new Resource(data);
          });

          //  _.trigger(afterLoadEventKey, resourceFactory);

          $log.debug('$resource Initialized', resources);
          // return resourceFactory;
        },
        loadResource = function loadResource(resourceId) {
          var resource = resources[resourceId];

          if (!resource) {
            $log.error('Invalid resourceId:', resourceId, resources);
            return $q.reject('Invalid resourceId: ' + resourceId);
          }

          return $api.jasper.resource(resource.uri).then(function (jasperData) {
            resource.data = _.extend(resource.data, jasperData);
            return resource;
          });
        };

      function Resource(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }



      Resource.prototype = Object.create(Object.prototype, {

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
          value: function updateResource(name, description) {
            var self = this;
            return $api.resources.update(self.id, self.uri, name, description)
              .then (function $updateResourceResponse() {
              $log.debug('Resource Updated', self.data);
            });    }
        },

        $copy: {
          enumerable: true,
          value: function $copyResource(label, description) {
            var self = this;
            return $api.resources.copy(self.id, label, description).then(function $copyResourceResponse(data) {
              $log.debug('Resource Copied', data);
              var newResource = new Resource(data);
              resources[newResource.id] = newResource;
              $log.debug('New Resource', newResource);
              return newResource;
            });
          }
        },

        $delete: {
          enumerable: true,
          value: function $deleteResource() {
            var self = this;
            return $api.resources.delete(self.id).then(function $deleteResourceResponse() {
              $log.debug('Resource Deleted', self.data);
              delete resources[self.id];
            });
          }
        }
      });

      resourceFactory = Object.create(Object.prototype, {
        navigator: {
          enumerable: true,
          value: function getCurrentLoc() {
            return window.navigator.geolocation;
          }
        },
        all: {
          enumerable: true,
          get: function allResources() {
            return resources;
          }
        },
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(resources)) {
              $log.debug('Already loaded, triggering handler');
              handler(self);
            }
          }
        },
        get: {
          enumerable: true,
          value: function getResource(resourceId) {
            return loadResource(resourceId);
          }
        },
        getResourceIdByCoordinates : {
          enumerable: true,
          value: function getResourceIdByCoordinates(coordinates) {
          }
        }
      });
      return resourceFactory;
    }
  );
})(window.angular, window._);

 */
