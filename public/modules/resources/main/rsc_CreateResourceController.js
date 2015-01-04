(function (angular, app) {
  'use strict';

  app.controller('CreateResourceController', ['$scope', 'ResourceTaxonomyService',
    function ($scope, ResourceTaxonomy) {
      var
      // THING
        thing = {
          headline: '',
          description: '',
          type: '',
          details: {}
        },
        isSummarySet = false,
        isTaxonomySet = false,


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

        description : {
          enumerable: true,
          get: function() {
            return thing.description;
          },
          set: function(val) {
            thing.description = val;
          }
        },

        isSummarySet : {
          enumerable: true,
          get: function () {
            return isSummarySet;
          },
          set: function(val) {
            isSummarySet = val;
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
        details : {
          enumerable: true,
          get: function() {
            return thing.details;
          },
          set: function(val) {
            thing.details = val;
          }
        },

        isTaxonomySet : {
          enumerable: true,
          get: function () {
            return isTaxonomySet;
          },
          set: function(val) {
            isTaxonomySet = val;
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
            return false;
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
            return false;
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
            return false;
          }
        }
      });
    }]);
})(window.angular, window.guttersnipe);
