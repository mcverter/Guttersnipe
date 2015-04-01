(function () {
    'use strict';

    function placeService (Geolocator) {

        var placeFactory = {
            locateAddress: locateAddress,
            defaultZoom: getDefaultZoom,
            prospectPark: getProspectPark,
            emptyPlace : getEmptyPlace,
            createMapFromResources: createMapFromResources
        } ;

        function createMapFromResources(resources) {
            var marker,
                markers = [],
                center;

            var latTotal, lngTotal, idx;
            _.forEach(resources, function(resource){
                latTotal += resource.place.lat;
                lngTotal += resource.place.lng;

                marker = {
                    latitude: resource.place.lat,
                    longitude: resource.place.lng,
                    title: resource.thing.description.headline,
                    idKey: idx
                }
                markers.push(marker);
                idx++;
            })
        }

        /**
         *
         * angular.module('appMaps', ['uiGmapgoogle-maps'])
         .controller('mainCtrl', function($scope) {
    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {}
    };
    $scope.options = {
      scrollwheel: false
    };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
        }
        $scope.randomMarkers = markers;
      }
    }, true);
  });
         * @returns {number}
         */
        function getDefaultZoom() {
            return 14;
        }

        function getProspectPark() {
            return  {
                coordinates: {
                    lat: '40.660204',
                    lng: '-73.968956'},
                address: 'Prospect Park Brooklyn, NY 11225'
            };
        }

        function getEmptyPlace() {
            return  {
                coordinates: {
                    lat: '',
                    lng: ''},
                name: '',
                address: '',
                notes: ''
            };;
        }

        function locateAddress(inputAddress, map) {
            Geolocator.geocoder.geocode( { "address": inputAddress },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                         return {
                            coords: results[0].geometry.location,
                            formattedAddress : results[0].formatted_address
                        }
                        //$scope.myMap.panTo(location);
                    }
                });
        }

        return placeFactory;
    }
    angular.module('places').factory('Places',
        ['Geolocator', placeService]);
})();


