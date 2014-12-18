(function (angular, app, _) {
    'use strict';

    app.controller('MapController', ['$scope', '$log',
        function ($scope, $log) {
            var inputAddress = 'Prospect Park',
                center = {lat: 40.660204,lng: -73.968956, zoom: 14},
                geocoder = new google.maps.Geocoder();

            $scope.center = {lat: 40.095,lng: -3.823, zoom: 14};

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

                locateAddress : {
                    enumerable: true,
                    value: function locateAddress($event) {
                        $event.preventDefault();
                        geocoder.geocode( { "address": inputAddress }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                                inputAddress =   results[0].formatted_address;
                                center = {
                                    lat: results[0].geometry.location.k,
                                    lng: results[0].geometry.location.B,
                                    zoom: 15
                                };
                            }
                        })
                    }
                }

            });
            var moo = 1 +1;

        }])


}) (window.angular, window.guttersnipe, window._);
