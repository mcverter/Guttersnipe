  (function (angular, _) { 'use strict';
angular.module('resources')
    .directive('resourceCreateInstructions', ['resource_templates', function(templates) {
    var linker = function(scope, element, attrs) {},
      controller = function($scope){},
      templateUrl = templates.instructions + 'rsc_InstructionsTemplate.html';

    return {
      link: linker,
      restrict: 'E',
      templateUrl: templateUrl,
      controller: controller
    };
  }]
  );
