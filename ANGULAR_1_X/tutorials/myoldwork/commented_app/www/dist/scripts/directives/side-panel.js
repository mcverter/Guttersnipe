(function (angular, app, _) {
  'use strict';

  app.directive('sidePanel', ['$log', '$window', '$timeout', '$debug',
    function ($log, $window, $timeout, $debug) {
      return {
        restrict: 'E',
        templateUrl: 'bower_components/novafoundation/app/views/directives/side-panel.html',
        replace: true,
        transclude: true,
        scope: {
          open: '=?open'
        },
        controller: ['$scope',
          function ($scope) {
            $log.debug('sidePanel.controller', $scope);

            $scope.togglePanel = function togglePanel() {
              $scope.open = !$scope.open;

              //some d3 controls respond to window.resize events -- should fix those but this works for now
              $timeout($window.onresize);
            };
          }]
      };
    }]);

}) (window.angular, window.novantas, window._);