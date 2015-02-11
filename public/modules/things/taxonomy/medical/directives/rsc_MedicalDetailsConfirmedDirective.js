  'use strict';

    angular.module('things').directive('medicalDetailsConfirmed', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/medical/templates/rsc_MedicalDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


