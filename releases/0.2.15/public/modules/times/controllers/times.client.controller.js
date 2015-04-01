(function (angular, _) {
  'use strict';

// Times controller
  angular.module('times').controller('TimesController', ['$scope', 'Times',
    function($scope, Times) {
      $scope.time = {
        isScheduled : false
      };
    }
  ]);
})(window.angular, window._);