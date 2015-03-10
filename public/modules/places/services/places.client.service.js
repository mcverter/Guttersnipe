(function (angular, _) {
  'use strict';

  angular.module('places').factory('Places',
    [
    function() {
      function Place(data) {
        var self = this;
        self.data = data || {};
      }


      Place.prototype = Object.create(Object.prototype, {
      });
      return {};

    }]
  );
})(window.angular, window._);

