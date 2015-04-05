(function () {
  'use strict';

  angular.module('resources').directive('resourceLi', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-li.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})();

