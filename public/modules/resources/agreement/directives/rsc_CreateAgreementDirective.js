  'use strict';
angular.module('resources')
    .directive('resourceCreateAgreement', [function() {
      var linker = function(scope, element, attrs) {},
        controller = function($scope){},
        templateUrl = 'agreement/templates/rsc_AgreementTemplate.html'

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        link: linker,
        controller: controller
      };
    }]
  );
