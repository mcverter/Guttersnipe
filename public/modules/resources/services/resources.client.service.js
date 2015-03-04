(function (angular, _) {

  'use strict';

//Resources service used for communicating with the resources REST endpoints
  angular.module('resources').factory('Resources', ['$resource',
    function($resource) {
      return $resource('resources/:resourceId', {
        resourceId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);
})(window.angular,  window._);