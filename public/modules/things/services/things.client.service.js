/**
 * @class Things (Factory):
 * Returns an object containing all the Novantas Things,
 in the Microsoft ui.Things table
 *
 * Private
 * --------
 * @field thingFactory:  Returned object
 * @field things:  List of Things
 * @field afterLoadEventKey : Trigger for reloading the things from the server
 *                            and updating the factory
 * @method initialize : Initializes to things object
 * @method loadThing(thingId):
 * @addToThings
 * @removeFromThings
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(thingId)
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Things factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Thing factory
 * $api.things.onUpdate(): Provides callback to $api
 *                  for updating Thing factory
 *
 */


/**
 * @class Things (Factory):
 * Returns an object containing all the Novantas Things,
 in the Microsoft ui.Things table
 *
 * Private
 * --------
 * @field thingFactory:  Returned object
 * @field things:  List of Things
 * @field afterLoadEventKey : Trigger for reloading the things from the server
 *                            and updating the factory
 * @method initialize : Initializes to things object
 * @method getTemplateIds:  Returns the things which are Templates for new things
 * @method loadThing(thingId):
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(thingId)
 * @method templates()
 *
 *
 * Extern
 * ------
 * $api.onLogin(): Provides callback to $api for login
 *                 Initializes Things factory
 * $api.onLogout(): Provides callback to $api for logout
 *                  Deletes Thing factory
 * $api.things.onUpdate(): Provides callback to $api
 *                  for updating Thing factory
 *
 */



(function (angular, _) {
  'use strict';

  angular.module('things').factory('Things',
    function() {
      var thingFactory,
        things = {},
        afterLoadEventKey = '$thing.afterLoad',
        initialize = function $thingInitialize(state) {
          things = {};

          // things
          _.each(state.things, function (data, id) {
            things[id] = new Thing(data);
          });

          //  _.trigger(afterLoadEventKey, thingFactory);

          $log.debug('$thing Initialized', things);
          // return thingFactory;
        },
        loadThing = function loadThing(thingId) {
          var thing = things[thingId];

          if (!thing) {
            $log.error('Invalid thingId:', thingId, things);
            return $q.reject('Invalid thingId: ' + thingId);
          }

          return $api.jasper.thing(thing.uri).then(function (jasperData) {
            thing.data = _.extend(thing.data, jasperData);
            return thing;
          });
        };

      function Thing(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }


      /**
       * Class Thing:
       * Object representing a Guttersnipe Thing,
       * a row in the mongo guttersnipe.place Collection
       *
       * @field data:  Received from server

       * @field id: ObjectId
       * @field headline: String
       * @field summary: String
       * @field taxonomy: Taxonomy Object

       * @method $update(name, description):
       * @method $copy(label, description):
       * @method $delete
       */



      Thing.prototype = Object.create(Object.prototype, {

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
          value: function updateThing(name, description) {
            var self = this;
            return $api.things.update(self.id, self.uri, name, description)
              .then (function $updateThingResponse() {
              $log.debug('Thing Updated', self.data);
            });    }
        },

        $copy: {
          enumerable: true,
          value: function $copyThing(label, description) {
            var self = this;
            return $api.things.copy(self.id, label, description).then(function $copyThingResponse(data) {
              $log.debug('Thing Copied', data);
              var newThing = new Thing(data);
              things[newThing.id] = newThing;
              $log.debug('New Thing', newThing);
              return newThing;
            });
          }
        },

        $delete: {
          enumerable: true,
          value: function $deleteThing() {
            var self = this;
            return $api.things.delete(self.id).then(function $deleteThingResponse() {
              $log.debug('Thing Deleted', self.data);
              delete things[self.id];
            });
          }
        }
      });

      thingFactory = Object.create(Object.prototype, {
        navigator: {
          enumerable: true,
          value: function getCurrentLoc() {
            return window.navigator.geolocation;
          }
        },
        all: {
          enumerable: true,
          get: function allThings() {
            return things;
          }
        },
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(things)) {
              $log.debug('Already loaded, triggering handler');
              handler(self);
            }
          }
        },
        get: {
          enumerable: true,
          value: function getThing(thingId) {
            return loadThing(thingId);
          }
        },
        getThingIdByCoordinates : {
          enumerable: true,
          value: function getThingIdByCoordinates(coordinates) {
          }
        }
      });
      return thingFactory;
    }
  );
})(window.angular, window._);

