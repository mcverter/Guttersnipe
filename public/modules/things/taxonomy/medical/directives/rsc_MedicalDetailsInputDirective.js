  'use strict';

    angular.module('things').directive('medicalDetailsInput', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/medical/templates/rsc_MedicalDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


