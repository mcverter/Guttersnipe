(function (angular, app) {
  'use strict';

  app.directive('mapConfirm', ['filePaths', function(filePaths) {
    var templateUrl = filePaths.resources_create_wizard + 'rsc_MapWidget.html';

    return {
      restrict: 'E',
      templateUrl: templateUrl,
      controller:  ['$scope', '$log',
        function ($scope, $log) {
          var inputAddress = 'Prospect Park',
            center = {lat: 40.660204,lng: -73.968956, zoom: 14},
            markers =  {
              mainMarker: {
                lat: 40.660204,
                lng: -73.968956,
                focus: true,
                message: "resource location",
                draggable: true
              }
            },
            geocoder = new google.maps.Geocoder();

          $scope.center = center;
          $scope.markers = markers;

          Object.defineProperties($scope, {


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
                        message: "resource location",
                        draggable: true
                      }
                    };


                  }
                })
              }
            }
          });
          var moo = 1 +1;
        }]
    }
  }]);
})(window.angular, window.guttersnipe);
