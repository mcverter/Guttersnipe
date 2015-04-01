(function () {
    'use strict';

    function placeService (Geolocator) {

        var placeFactory = {
            locateAddress: locateAddress,
            defaultZoom: getDefaultZoom,
            prospectPark: getProspectPark,
            emptyPlace : getEmptyPlace
        } ;

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


