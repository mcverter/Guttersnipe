    (function (angular, _) { 'use strict';
angular.module('resources')
    .controller('LocationController', ['$scope', '$log',
        function ($scope, $log) {
            var geocoder = new google.maps.Geocoder();
            $scope.map = { center: { latitude: 40.651849, longitude: -73.962817 }, zoom: 15 };

            geocoder.geocode( { 'address': '1355 lombard street, 94109' }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    var result = results[0];
                    var formatted_address =   result.formatted_address;
                    var long =                         result.geometry.location.k;
                    var lat =  results[0].geometry.location.B;
                }
            });

//            Object.defineProperties($scope, {});
        }]);})(window.angular, window._)
