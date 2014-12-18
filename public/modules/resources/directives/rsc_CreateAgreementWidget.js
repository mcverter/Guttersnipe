(function (angular, app) {
  'use strict';

  app.directive('resourceCreateAgreement', ['filePaths', function(filePaths) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = filePaths.resources_create_wizard + 'rsc_AgreementWidget.html'

      return {
        restrict: 'E',
        template: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})(window.angular, window.guttersnipe);
