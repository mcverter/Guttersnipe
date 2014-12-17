(function (angular, app) {
  'use strict';

  var BASE_ROUTE ='js/directives/templates/';
  app.directive('resourceCreateInstructions', function() {
    var linker = function(scope, element, attrs) {},
      templateUrl = BASE_ROUTE + 'InstructionsPage.html',
      controller = function($scope){ };
    return {
      link: linker,
      restrict: 'E',
      template: templateUrl,
      controller: controller
    };
  });
})(window.angular, window.guttersnipe);
