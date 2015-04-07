
(function () {
    'use strict';

    function CreateMapController($scope, Places) {
        $scope.map = getMap;
        $scope.coordinates = Places.prospectPark.coordinates;
        $scope.inputAddress = '';
        $scope.formattedAddress = '';
        $scope.locateAddress = locateAddress;

        function getMap () {
            return {
                center: {
                    latitude: $scope.coordinates.lat,
                        longitude: $scope.coordinates.lng
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
            };
        }

        function locateAddress ($event, address) {
            $event.preventDefault();
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode( { "address": address },
                function(results, status) {
                    var formattedAddress;
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        formattedAddress =
                            results[0].formatted_address;
                        $scope.$apply (function() {
                            $scope.place.address = formattedAddress;
                            $scope.place.coordinates.lat = results[0].geometry.location.k;
                            $scope.place.coordinates.lng = results[0].geometry.location.D;
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
                    }
                });
        }
    }



angular.module('places')
    .directive('createMap', ['places_templates',
        function(templates) {
            var templateUrl = templates.main + 'place.create-map.client.template.html';
            return {
                restrict: 'E',
                scope : {
                    place: '=',
                    confirmations: '='
                },
                templateUrl: templateUrl,
                controller: ['$scope', 'Places', CreateMapController]
            };
        }]);
})();


