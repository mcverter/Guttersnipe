(function () {
    'use strict';

    function placeService (Geolocator) {

        var placeFactory = {
            locateAddress: locateAddress,
            defaultZoom: getSingleZoom,
            prospectPark: getProspectPark,
            emptyPlace : getEmptyPlace,
            createMapFromResources: createMapFromResources
        } ;

        function createMapFromResources(resources) {
            var marker,
                markers = [],
                latTotal = 0,
                lngTotal = 0,
                idx = 0,
                latAvg = 0,
                lngAvg = 0,
                map = {},
                fullUrl;

            _.forEach(resources, function(resource){
                latTotal += resource.place.coordinates.lat;
                lngTotal += resource.place.coordinates.lng;
                fullUrl = '#/resources/' + resource._id;

                marker = {
                    latitude: resource.place.coordinates.lat,
                    longitude: resource.place.coordinates.lng,
                    title: resource.headline + '<br> \n' +
                    '<a href="' + fullUrl + '">Full Record</a>',
                    id: idx

                };
                markers.push(marker);
                idx++;
            });

            console.log('lattotal', latTotal, 'lng total', lngTotal, 'idx', idx);
            latAvg = latTotal/idx;
            lngAvg = lngTotal/idx;

            map = {
                center: {
                    latitude: latAvg,
                    longitude: lngAvg
                },
                zoom: getMultipleZoom,
                markers: markers,
                options: {
                    scrollwheel: false
                }
            };
            return map;
        }


        function getMultipleZoom() {
            return 10
        }

        function getSingleZoom() {
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
                        };
                        //$scope.myMap.panTo(location);
                    }
                });
        }

        return placeFactory;
    }
    angular.module('places').factory('Places',
        ['Geolocator', placeService(Geolocator)]);
})();


