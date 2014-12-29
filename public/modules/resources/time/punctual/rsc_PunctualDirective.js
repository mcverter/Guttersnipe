(function (angular, app) {
  'use strict';

  app.directive('schedulePunctual', ['filePaths', function(filePaths) {
      console.log('in punctual directive');
      var templateUrl = filePaths.resources_dir + 'time/punctual/rsc_PunctualWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


