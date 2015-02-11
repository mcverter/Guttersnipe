  'use strict';
angular.module('resources')
    .directive('resourceCreateInstructions', [function() {
    var linker = function(scope, element, attrs) {},
      controller = function($scope){},
      templateUrl =  'instructions/templates/rsc_InstructionsTemplate.html';

    return {
      link: linker,
      restrict: 'E',
      templateUrl: templateUrl,
      controller: controller
    };
  }]
  );
