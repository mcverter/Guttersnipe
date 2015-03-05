(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutResourceLi', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-li.template.html';
      console.log('In gut resource confirmed');

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

