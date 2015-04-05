(function () {
  'use strict';

  angular.module('resources').directive('resourceMethod', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-method.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})();

