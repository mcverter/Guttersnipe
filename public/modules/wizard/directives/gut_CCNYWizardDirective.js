(function () {
  'use strict';
  angular.module('wizard')
    .directive('ccnyWizard', ['wizard_templates', function(templates) {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = templates.templateDir + 'ccny_WizardTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
})();
