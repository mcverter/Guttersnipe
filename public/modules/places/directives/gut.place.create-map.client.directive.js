(function (angular, _) {
    'use strict';

    angular.module('places')
        .directive('createMap', ['places_templates', 'Places', 'Geolocator',
            function(templates, Places, Geolocator) {
                var templateUrl = templates.main + 'place.create-map.client.template.html';
                return {
                    restrict: 'E',
                    scope : {
                        place: '=',
                        isCreatePlaceConfirmed: '='
                    },
                    templateUrl: templateUrl,
                    controller: function($scope) {
                        var coordinates = Places.prospectPark.coordinates,
                            inputAddress,
                            formattedAddress;

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
                        };;

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
                                    var foo;
                                    var geocoder = new google.maps.Geocoder();

                                    geocoder.geocode( { "address": address },
                                        function(results, status) {
                                            var formattedAddress;
                                            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                                                var location = results[0].geometry.location;
                                                formattedAddress =
                                                    results[0].formatted_address;
                                                $scope.$apply (function() {
                                                    $scope.place.address = formattedAddress;
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
                        });
                    }
                };
            }]);
})(window.angular, window._);


