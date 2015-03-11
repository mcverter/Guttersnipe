(function (angular, _) {
  'use strict';

  angular.module('places').factory('Places',
    [
    function() {
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
      return {};

    }]
  );
})(window.angular, window._);

