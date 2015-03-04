(function (angular, _) {
  'use strict';

// Places controller
  angular.module('places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
    function($scope, $stateParams, $location, Authentication, Places) {

      var geocoder = new google.maps.Geocoder();;

      $scope.authentication = Authentication;

      $scope.place = {
        isLocationSet: false,
        address: 'Prospect Park, Brooklyn, NY',
        center: {
          lat: 40.660204,
          lng: -73.968956,
          zoom: 14
        },
        description: '',
        markers: {
          mainMarker: {
            lat: 40.660204,
            lng: -73.968956,
            focus: true,
            draggable: true
          }
        },
      };


      $scope.locateAddress =  function locateAddress($event) {
        $event.preventDefault();
        geocoder.geocode( { 'address': $scope.place.address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            $scope.place.address =   results[0].formatted_address;
            $scope.place.center = {
              lat: results[0].geometry.location.k,
              lng: results[0].geometry.location.D,
              zoom: 15
            };
            $scope.place.markers = {
              mainMarker: {
                lat: results[0].geometry.location.k,
                lng: results[0].geometry.location.D,
                focus: true,
                message: 'Resource Location',
                draggable: true
              }
            };
          }
        })
      }

    }
  ]);
})(window.angular, window._);