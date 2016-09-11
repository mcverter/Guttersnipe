/**
 * Used to contain the data for creating a resource on Guttersnipe.
 *
 * Each aspect of resource creation is determined by a particular
 *     Directive which directs that stage of creation.
 *
 * Functionality that is isolated to that directive will be defined by that
 *    directive's particular controller
 *
 * Other aspects of resource creation must persist between creation stages.
 * Furthermore, many of these data will need to be pushed to the database
 *   in order to create a persistent object that can be retrieved in searches.
 *
 *
 * These data are :
 * (1)  THING
 * ... (a) Headline -- Short description
 * ... (b) Summary -- Long description
 * ... (c) Type  -- Food, Medical, or Housing
 * ... (d) Details -- Detailed breakdown
 * (2) PLACE
 * ... (a) Description -- A description of the location
 * ... (b) Coordinates -- Lat, Lng pair
 * ... (c) Street Address -- Geocode Normalized address
 * (3) TIME
 * ... (a) Schedules -- an array of Date + Duration objects
 *
 */


(function (angular, app) {
  'use strict';

  app.controller('NewCreateResourceController', ['$scope', 'ResourceTaxonomyService',
    function ($log) {
      var
        isSummarySet = false,
        isTaxonomySet = false,
        isTypeSet = false,
        areDetailsSet = false,
        areSchedulesSet = false,
        headline = '',
        summary = '',
        type = '',
        details = [],
        placeDescription = '',
        lat = '',
        lng = '',
        schedules = [];

      Object.defineProperties($scope, {
        isSummarySet : {
          enumerable: true,
          get: function() {
            return isSummarySet;
          },
          set: function(val) {
            isSummarySet=val;
          }
        },
        isTaxonomySet : {
          enumerable: true,
          get: function() {
            return isTaxonomySet;
          },
          set: function(val) {
            isTaxonomySet=val;
          }
        },
        isTypeSet : {
          enumerable: true,
          get: function() {
            return isTypeSet;
          },
          set: function(val) {
            isTypeSet=val;
          }
        },
        areDetailsSet : {
          enumerable: true,
          get: function() {
            return areDetailsSet;
          },
          set: function(val) {
            areDetailsSet=val;
          }
        },
        areSchedulesSet : {
          enumerable: true,
          get: function() {
            return areSchedulesSet;
          },
          set: function(val) {
            areSchedulesSet='$ git tag -a v0.1 363f2b3bff3ff218831bbf9fb6b2910c936493b3 -m "Demo of Resource Creation UI"';
          }
        },
        thing : {
          headline : {
            enumerable: true,
            get: function() {
              return headline;
            },
            set: function(val) {
              headline=val;
            }
          },
          summary : {
            enumerable: true,
            get: function() {
              return summary;
            },
            set: function(val) {
              summary = val;
            }
          },
          type: {
            enumerable: true,
            get: function() {
              return type;
            },
            set: function(val) {
              type = val;
            }
          },
          details : {
            enumerable: true,
            get: function() {
              return details;
            },
            set: function(val) {
              details = val;
            }
          }
        },

        place : {
          description : {
            enumerable: true,
            get: function() {
              return placeDescription;
            },
            set: function(val) {
              placeDescription = val;
            }
          },
          coordinates : {
            lat : {
              enumerable: true,
              get: function() {
                return lat;
              },
              set: function(val) {
                lat = val;
              }
            },
            lng : {
              enumerable: true,
              get: function() {
                return lng;
              },
              set: function(val) {
                lng = val;
              }
            }
          }
        },
        time : {
          schedules : {
            enumerable: true,
            get: function() {
              return schedules;
            },
            set: function(val) {
              schedules = val;
            }
          }

        }
      });

    }])
})(window.angular, window.guttersnipe);

/*
 app.controller('NewCreateResourceController', ['$scope', 'ResourceTaxonomyService',
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
 place = {
 center: {
 lat: center.lat,
 lng: center.lng
 },
 description : ''
 },


 center = {lat: 40.660204,lng: -73.968956, zoom: 14},
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
 //  Summary Template
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

 // Taxonomy Templates
 // (Type Template, Details Template)
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
 }]);*/
