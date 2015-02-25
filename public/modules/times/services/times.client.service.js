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
 * @method getTemplateIds:  Returns the times which are Templates for new times
 * @method loadTime(timeId):
 *
 * Public
 * --------
 *
 * @field all:
 * @method onLoad(handler):
 * @method get(timeId)
 * @method templates()
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

  angular.module('times').factory('Geolocation',
    function() {
      var timeFactory = {},
        times = {},
        afterLoadEventKey = '$time.afterLoad',
        initialize = function $timeInitialize(state) {
          times = {};

          // times
          _.each(state.times, function (data, id) {
            times[id] = new Time(data);
          });

          //  _.trigger(afterLoadEventKey, timeFactory);

          $log.debug('$time Initialized', times);
          // return timeFactory;
        },
        loadTime = function loadTime(timeId) {
          var time = times[timeId];

          if (!time) {
            $log.error('Invalid timeId:', timeId, times);
            return $q.reject('Invalid timeId: ' + timeId);
          }

          return $api.jasper.time(time.uri).then(function (jasperData) {
            time.data = _.extend(time.data, jasperData);
            return time;
          });
        };

      function Time(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }



      Time.prototype = Object.create(Object.prototype, {

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
          value: function updateTime(name, description) {
            var self = this;
            return $api.times.update(self.id, self.uri, name, description)
              .then (function $updateTimeResponse() {
              $log.debug('Time Updated', self.data);
            });    }
        },

        $copy: {
          enumerable: true,
          value: function $copyTime(label, description) {
            var self = this;
            return $api.times.copy(self.id, label, description).then(function $copyTimeResponse(data) {
              $log.debug('Time Copied', data);
              var newTime = new Time(data);
              times[newTime.id] = newTime;
              $log.debug('New Time', newTime);
              return newTime;
            });
          }
        },

        $delete: {
          enumerable: true,
          value: function $deleteTime() {
            var self = this;
            return $api.times.delete(self.id).then(function $deleteTimeResponse() {
              $log.debug('Time Deleted', self.data);
              delete times[self.id];
            });
          }
        }
      });

      timeFactory = Object.create(Object.prototype, {
        navigator: {
          enumerable: true,
          value: function getCurrentLoc() {
            return window.navigator.geolocation;
          }
        },
        all: {
          enumerable: true,
          get: function allTimes() {
            return times;
          }
        },
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(times)) {
              $log.debug('Already loaded, triggering handler');
              handler(self);
            }
          }
        },
        get: {
          enumerable: true,
          value: function getTime(timeId) {
            return loadTime(timeId);
          }
        },
        getTimeIdByCoordinates : {
          enumerable: true,
          value: function getTimeIdByCoordinates(coordinates) {
          }
        }
      });
      return timeFactory;
    }
  );
})(window.angular, window._);

