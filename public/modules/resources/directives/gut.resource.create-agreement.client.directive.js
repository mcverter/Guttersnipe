  (function (angular, _) { 'use strict';
angular.module('resources')
    .directive('resourceCreateAgreement', ['resource_templates', function(templates) {
    var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = templates.agreement + 'rsc_AgreementTemplate.html';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
  })(window.angular,  window._);