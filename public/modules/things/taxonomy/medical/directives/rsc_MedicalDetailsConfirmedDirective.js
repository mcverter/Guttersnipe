  (function (angular, _) { 'use strict';

    angular.module('things').directive('medicalDetailsConfirmed', ['things_templates', function(templates) {
      var templateUrl = templates.medical + 'rsc_MedicalDetailsConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


