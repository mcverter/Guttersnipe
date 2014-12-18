(function (angular, app) {
  'use strict';

  app.directive('resourceCreateInstructions', ['filePaths', function(filePaths) {
    var linker = function(scope, element, attrs) {},
      controller = function($scope){},
      templateUrl = filePaths.resources_create_wizard + 'rsc_AgreementWidget.html';

    return {
      link: linker,
      restrict: 'E',
      template: templateUrl,
      controller: controller
    };
  }]
  );
})(window.angular, window.guttersnipe);
