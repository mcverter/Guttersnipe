  (function (angular, _) { 'use strict';

    angular.module('things').directive('medicalDetailsInput', ['things_templates', function(templates) {
      var templateUrl = templates.medical + 'rsc_MedicalDetailsInputTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


