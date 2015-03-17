(function (angular, _) {
  'use strict';

  angular.module('places')
    .directive('createMap', ['places_templates', 'Places', 'Geolocator',
      function(templates, Places, Geolocator) {
        var templateUrl = templates.main + 'place.create-map.client.template.html';
        return {
          restrict: 'E',
          scope : {
            place: '='
          },
          templateUrl: templateUrl,
          controller: function($scope) {
            var coordinates = Places.prospectPark.coordinates,
              inputAddress,
              formattedAddress;

            $scope.$watch('map', function(newValue) {
              console.log('waching map.  nv is', newValue);
            });

            var map = {
              center: {
                latitude: coordinates.lat,
                longitude: coordinates.lng
              },
              marker: {
                id: 1,
                options: {
                  draggable: false
                },
                events: {}
              },
              zoom: Places.defaultZoom,
              options: {}
            }

            Object.defineProperties($scope, {
              map: {
                enumerable: true,
                set: function(val){
                  map = val;
                },
                get: function() {
                  return map;
                }
              },

              inputAddress:  {
                enumerable: true,
                set: function(val){
                  inputAddress = val;
                },
                get: function() {
                  return inputAddress;
                }
              },
              locateAddress:  {
                enumerable: true,
                value: function($event, address) {
                  $event.preventDefault();
                  console.log('locating address');
                  var foo;
                  var geocoder = new google.maps.Geocoder();

                  geocoder.geocode( { "address": address },
                    function(results, status) {
                      var formattedAddress;
                      console.log('submitted it', results);
                      console.log('hope it is good');
                      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        var location = results[0].geometry.location;
                        formattedAddress =
                          results[0].formatted_address;
                        $scope.$apply (function() {
                          $scope.map = {
                            center: {
                              latitude: results[0].geometry.location.k,
                              longitude: results[0].geometry.location.D
                            },
                            marker: {
                              id: 1,
                              options: {
                                draggable: false
                              },
                              events: {}
                            },
                            zoom: 14,
                            options: {}
                          };
                        });
                        console.log('scope is', $scope)
                        console.log('geocoded the map to ', map)

                      }
                    });
                }
              }
            });
          }
        };
      }]);
})(window.angular, window._);


