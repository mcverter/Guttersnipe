/**
 * @class Geolocation (Service):
 * Returns information about Geographical Location
 *
 * Private
 * --------
 * @field placeFactory:  Returned object
 * @method initialize : Initializes to places object
 *
 * Public
 * --------
 *
 * @method getCurrentLocation():  Location of device accessing site
 * @method geocodeAddress(String): Coordinates of String location
 *
 */

(function (angular,google,  _) {
  'use strict';

  angular.module('places').factory('Geolocator',
    function() {
      var geolocatorFactory,
        geocoder = window.geocoder;

      if  (!geocoder) {

        if (google && google.maps) {
          geocoder = new google.maps.Geocoder();
        }
        else {
          console.error('Error:  can not create geocoder.  Google is', google);
        }
      }


      geolocatorFactory = Object.create(Object.prototype, {
        getCurrentLocation: {
          enumerable: true,
          value: function getCurrentLocation() {
            return window.navigator.geolocation;
          }
        },
        locateAddress: {
          enumerable: true,
          value: function locateAddress(address) {

            var center, formattedAddress;

            geocoder.geocode(
              { 'address': address },
              function (results, status) {
                if ((status === google.maps.GeocoderStatus.OK) &&
                  results.length > 0) {
                  formattedAddress =
                    results[0].formatted_address;
                  center = {
                    lat: results[0].geometry.location.k,
                    lng: results[0].geometry.location.D

                  };
                }
              });
          }
        }
      });
      return geolocatorFactory;
    });
})(window.angular, window.google, window._);

