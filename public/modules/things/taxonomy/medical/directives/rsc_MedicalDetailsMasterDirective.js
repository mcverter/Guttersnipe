  'use strict';

    angular.module('things').directive('medicalDetailsMaster', ['templates', function(templates) {
      var templateUrl = 'modules/things/taxonomy/medical/templates/rsc_MedicalDetailsMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


