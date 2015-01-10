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
        isTypeSet = false,
        areDetailsSet = false,


      // PLACE:
        isLocationSet = false,
        inputAddress = 'Prospect Park',
        center = {lat: 40.660204,lng: -73.968956, zoom: 14},
        place = {
          center: {
            lat: center.lat,
            lng: center.lng
          },
          description : ''
        },

        markers =  {
          mainMarker: {
            lat: 40.660204,
            lng: -73.968956,
            focus: true,
            message: thing.headline,
            draggable: true
          }
        },
      // TIME
        isScheduleSet = false,
        dates = [],
        geocoder = {},
        google = google || {};

      console.log('Google is', google);

      // Google not set if no network connnection
      if (google && google.maps){
        geocoder = new google.maps.Geocoder();
      }


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

        toggleDetail : {
          enumerable: true,
          value: function (category, detail) {
            var idx,
              selections = category ?
                thing.details[category]['selections'] :
                thing.details['selections'];

            if (idx = _.find(selections, detail)) {
              selections.splice(idx, 1);
            }
            else {
              selections.push(detail);
            }
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

        isTypeSet : {
          enumerable: true,
          get: function () {
            return isTypeSet;
          },
          set: function(val) {
            isTypeSet = val;
          }
        },
        areDetailsSet : {
          enumerable: true,
          get: function () {
            return areDetailsSet;
          },
          set: function(val) {
            areDetailsSet = val;
          }
        },

        // Taxonomy Widgets
        // (Type Widget, Details Widget)
        clearTaxonomy : {
          enumerable: true,
          value: function() {
            thing.type = '';
            thing.details = {};
            isTaxonomySet = false;
            areDetailsSet - false;
            isTypeSet = false;

          }
        },
        resourceTaxonomy : {
          enumerable: true,
          get:  function() {
            return ResourceTaxonomy;
          }
        },
        unsetType: {
          enumerable: true,
          value: function() {
            isTaxonomySet = false;
            isTypeSet = false;
          }
        },
        setType : {
          enumerable: true,
          value : function(t) {
            isTypeSet = true;
            thing.type = t;
            switch(t) {
              case "food":
                thing.details = {
                  eating_arrangement: {
                    selections: []
                  },
                  protein: {
                    selections: []
                  },
                  grains: {
                    selections: []
                  },
                  produce:  {
                    selections: []
                  },
                  dairy:  {
                    selections: []
                  }
                }
                break;
              case "medical":
                thing.details = {
                  selections: []
                }
                break;
              case "housing":
                thing.details = {
                  selections: []
                }
                break;
            }
          }
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
            return isLocationSet;
          },
          set: function(val) {
            isLocationSet = val;
          }
        },
        placeDescription : {
          enumerable: true,
          get: function() {
            return place.description;
          },
          set: function(val) {
            place.description = val;
          }
        },

        inputAddress: {
          enumerable: true,
          get: function getInputAdress() {
            return inputAddress
          },
          set: function setMapTextAdress(val) {
            inputAddress = val
          }
        },

        center: {
          enumerable: true,
          get: function getCenter() {
            return center
          },
          set: function setCenter(val) {
            center = val
          }
        },

        markers: {
          enumerable: true,
          get: function getMarkers() {
            return markers;
          },
          set: function setMarkers(val) {
            markers = val
          }
        },

        locateAddress : {
          enumerable: true,
          value: function locateAddress($event) {
            $event.preventDefault();
            geocoder.geocode( { "address": inputAddress }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                inputAddress =   results[0].formatted_address;
                center = {
                  lat: results[0].geometry.location.k,
                  lng: results[0].geometry.location.D,
                  zoom: 15
                };
                markers = {
                  mainMarker: {
                    lat: results[0].geometry.location.k,
                    lng: results[0].geometry.location.D,
                    focus: true,
                    message: thing.headline,
                    draggable: true
                  }
                };
              }
            })
          }
        },

        // TIME

        isScheduleSet : {
          enumerable: true,
          get: function() {
            return isScheduleSet;
          },
          set: function(val) {
            isScheduleSet = val;
          }
        },

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
