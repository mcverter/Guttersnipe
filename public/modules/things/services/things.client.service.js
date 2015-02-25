(function (angular, _) {
  'use strict';

//Things service used to communicate Things REST endpoints
  angular.module('things').factory('Things', ['$resource',
    function($resource) {
      return $resource('things/:thingId', { thingId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
})(window.angular, window._);