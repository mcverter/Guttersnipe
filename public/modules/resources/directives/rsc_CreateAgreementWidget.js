(function (angular, app) {
  'use strict';
  var linker = function(scope, element, attrs) {},
    controller = function($scope){},
    templateUrl = filePaths.resources_create_wizard + 'rsc_AgreementWidget.html'

  app.directive('resourceCreateAgreement', ['filePaths', function(filePaths) {
      return {
        restrict: 'E',
        template: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})(window.angular, window.guttersnipe);
