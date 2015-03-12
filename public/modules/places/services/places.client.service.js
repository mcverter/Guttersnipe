(function (angular, _) {
  'use strict';

  angular.module('places').factory('Places',
    ['Geolocator',
    function(Geolocator) {
      console.log('making the place factory');

      var placeFactory,
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