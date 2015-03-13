(function (angular, _) {
  'use strict';

  angular.module('places').factory('Places',
    ['Geolocator',
      function(Geolocator) {
        var placeFactory,
          emptyPlace,
          prospectPark,
          defaultZoom = 14 ;
/*Map Marker is {"latitude":"40.660204","longitude":"-73.968956"}
 Center is {"latitude":40.65369267709071,"longitude":-73.937799460083} */
        prospectPark = {
          coordinates: {
            lat: '40.660204',
            lng: '-73.968956'},
          address: 'Prospect Park Brooklyn, NY 11225'
        };
        emptyPlace = {
          coordinates: {
            lat: '',
            lng: ''},
          name: '',
          address: '',
          notes: ''
        };

        function Place(coordinates, address, name, notes) {
          var self = this;
          if (!coordinates || !coordinates.lat
            || coordinates.lng || !address ) {
            console.err('Error: Coordinates or address are undefined. Coords', coordinates, ' address ', address);
          }
          self.coordinates = coordinates;
          self.address = address;
          self.name = name;
          self.notes = notes;
        }


        Place.prototype = Object.create(Object.prototype, {
        });





        placeFactory = Object.create(Object.prototype, {


          locateAddress : {
            enumerable: true,
            value: function locateAddress($event, inputAddress) {
              var center, markers;
              $event.preventDefault();
              geocoder.geocode( { 'address': inputAddress }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                  inputAddress =   results[0].formatted_address;
                  center = {
                    lat: results[0].geometry.location.k,
                    lng: results[0].geometry.location.D,
                    zoom: 15
                  };
                }
              });
            }
          },



          defaultZoom: {
            enumerable: true,
            get: function getDefaultZoom() {
              return defaultZoom;
            }
          },
          prospectPark : {
            enumerable: true,
            get: function getProspectPark() {
              return prospectPark;
            }
          },
          emptyPlace: {
            enumerable: true,
            get: function getEmptyPlace() {
              return _.cloneDeep(emptyPlace);
            }
          }
        });

        return placeFactory;
      }]);
})(window.angular, window._);