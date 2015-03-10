
(function (angular, _) {
  'use strict';

  angular.module('things').factory('Things',
    [
      function() {
        function Thing(data) {
          var self = this;
          self.data = data || {};
        }


        Thing.prototype = Object.create(Object.prototype, {
        });
        return {};
      }]
  );
})(window.angular, window._);

