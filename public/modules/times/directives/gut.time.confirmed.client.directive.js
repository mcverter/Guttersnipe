(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutTimeConfirmed', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'confirmed-resource.template.html';
      console.log('In gut resource confirmed');

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

