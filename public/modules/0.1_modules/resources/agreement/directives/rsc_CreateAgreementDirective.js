(function (angular, app) {
  'use strict';

  app.directive('resourceCreateAgreement', ['filePaths', function(filePaths) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = filePaths.resources_dir + 'agreement/' + filePaths.templates_subdir + 'rsc_AgreementTemplate.html'

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})(window.angular, window.guttersnipe);
