(function (angular, _) {
  'use strict';
  angular.module('wizard')
    .directive('gutRscWizard', ['wizard_templates', function(templates) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = templates.templateDir + 'rsc_WizardTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})(window.angular, window._);