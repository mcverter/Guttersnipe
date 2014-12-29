(function (angular, app) {
  'use strict';

  app.directive('scheduleSeasonal', ['filePaths', function(filePaths) {
      console.log('in seasonal directive');
      var templateUrl = filePaths.resources_dir + 'time/seasonal/rsc_SeasonalWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


