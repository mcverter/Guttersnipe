(function (angular, app) {
  'use strict';

  app.controller('CreateResourceController', ['$scope', 'ResourceTaxonomyService',
    function ($scope, ResourceTaxonomy) {
      var
      // THING
        thing = {
          headline: '',
          summary: '',
          type: '',
          details: {}
        },

      // PLACE:
        place = {
          coordinates: {
            lat: '',
            lng: ''
          },
          description : ''
        },

      // TIME
        time = {
          weeklyRecurrences : [],
          seasonalRecurrences: [],
          punctualDates : []
        };


      Object.defineProperties($scope, {

        // THING
        //
        //  Summary Widget
        //
        headline : {
          enumerable: true,
          get: function() {
            return thing.headline;
          },
          set: function(val) {
            thing.headline = val;
          }
        },
        isHeadlineSet : {
          enumerable: true,
          get: function () {
            return !!(thing.headline);
          }
        },
        summary : {
          enumerable: true,
          get: function() {
            return thing.summary;
          },
          set: function(val) {
            thing.summary = val;
          }
        },
        isSummarySet : {
          enumerable: true,
          get: function () {
            return !!(thing.summary);
          }
        },

        // Taxonomy Widgets
        // (Type Widget, Details Widgeet)
        resourceTaxonomy : {
          enumerable: true,
          value:  ResourceTaxonomy
        },

        type : {
          enumerable: true,
          get: function() {
            return thing.type;
          },
          set: function(val) {
            thing.type = val;
          }
        },
        isTypeSet : {
          enumerable: true,
          get: function () {
            return !!(thing.type);
          }
        },
        details : {
          enumerable: true,
          get: function() {
            return thing.details;
          },
          set: function(val) {
            thing.details = val;
          }
        },
        areDetailsSet : {
          enumerable: true,
          get: function () {
            return !!(thing.details);
          }
        },


        // PLACE

        location : {
          enumerable: true,
          get: function() {
            return place.location;
          },
          set: function(val) {
            place.location = val;
          }
        },
        isLocationSet : {
          enumerable: true,
          get: function () {
            return !!(place.location);
          }
        },
        locationDescription : {
          enumerable: true,
          get: function() {
            return place.description;
          },
          set: function(val) {
            place.description = val;
          }
        },
        isLocationDescriptionSet : {
          enumerable: true,
          get: function () {
            return !!(place.description);
          }
        },

        // TIME
        weeklyRecurrences : {
          enumerable: true,
          get: function() {
            return time.weeklyRecurrences;
          },
          set: function(val) {
            time.weeklyRecurrences = val;
          }
        },
        seasonalRecurrences : {
          enumerable: true,
          get: function() {
            return time.seasonalRecurrences;
          },
          set: function(val) {
            time.seasonalRecurrences = val;
          }
        },
        punctualDates : {
          enumerable: true,
          get: function() {
            return time.punctualDates;
          },
          set: function(val) {
            time.punctualDates = val;
          }
        },

        addSeasonalRecurrence : {
          enumerable: true,
          value: function(schedule) {
            time.seasonalRecurrences.push(schedule);
          }
        },
        addWeeklyRecurrence : {
          enumerable: true,
          value: function(schedule) {
            time.weeklyRecurrences.push(schedule);
          }
        },

        addPunctualDate : {
          enumerable: true,
          value: function(schedule) {
            time.punctualDates.push(schedule);
          }
        },

        isScheduled : {
          enumerable: true,
          get: function () {
            return !!(time.punctualDates) ||
              !!(time.seasonalRecurrences) ||
              !! !!(time.weeklyRecurrences);
          }
        }
      });
    }]);
})(window.angular, window.guttersnipe);
