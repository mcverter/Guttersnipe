(function (angular, app) {
  'use strict';

  app.directive('address', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'navigation';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


