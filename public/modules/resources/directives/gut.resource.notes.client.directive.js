(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutResourceHeadline', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-notes.template.html';
      console.log('In gut resource confirmed');

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window._);

