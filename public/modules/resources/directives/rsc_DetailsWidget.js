(function (angular, app) {
  'use strict';
  var linker = function(scope, element, attrs) {},
    controller = function($scope){},
    templateUrl = filePaths.resources_create_wizard + 'rsc_DetailsWidget.html'

  app.directive('resourceDetails', ['filePaths', function(filePaths) {
      var linker = function(scope, element, attrs) {},
        templateUrl = templateUrl,
        controller = function($scope){ };
      return {
        link: linker,
        restrict: 'E',
        templateUrl: templateUrl,
        controller: controller
      };
    }]
  );
})(window.angular, window.guttersnipe);
