
(function () {
    'use strict';

    function GeolocationService() {

        var geocoder,
            geolocatorFactory = {
                geocoder: getGeocoder,
                getCurrentLocation: getCurrentLocation
            };

        function getGeocoder() {
            if (geocoder) {
                return geocoder;
            } else  {
                if (google && google.maps) {
                    geocoder = new google.maps.Geocoder();
                    return geocoder;
                }
                else {
                    console.error('Error:  can not create geocoder.  Google is', google);
                }
            }
        }


        function getCurrentLocation() {
            return window.navigator.geolocation;
        }
        return geolocatorFactory;
    }

    angular.module('places').factory('Geolocator',
        ['uiGmapGoogleMapApi', GeolocationService]);
})();

