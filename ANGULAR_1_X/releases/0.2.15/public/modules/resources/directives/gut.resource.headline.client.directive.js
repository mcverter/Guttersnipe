(function (angular, _) {
  'use strict';

  angular.module('resources').directive('gutResourceHeadline', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-headline.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular, window._);

