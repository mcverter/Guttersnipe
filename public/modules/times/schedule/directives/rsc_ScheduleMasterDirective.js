  'use strict';
  angular.module('times')
      .directive('scheduleMaster', ['templates', function(templates) {
          var templateUrl = templates.schedule + 'rsc_ScheduleMasterTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );


