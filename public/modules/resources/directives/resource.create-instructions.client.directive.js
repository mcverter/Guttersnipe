(function () {
  'use strict';
  angular.module('resources')
    .directive('createInstructions', ['resource_templates', function(templates) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl =  templates.main + 'resource-instructions.client.template.html';

      return {
        link: linker,
        restrict: 'E',
        templateUrl: templateUrl,
        controller: controller
      };
    }]
  );
})();
