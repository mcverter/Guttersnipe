(function (angular, app) {
  'use strict';

  app.directive('resourceCreateAgreement', ['filePaths', function(filePaths) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = filePaths.resources_dir + 'agreement/rsc_AgreementWidget.html'

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})(window.angular, window.guttersnipe);
