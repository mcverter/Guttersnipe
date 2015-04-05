(function () {
  'use strict';

  angular.module('resources').directive('resourceHeadline', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-headline.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})();

