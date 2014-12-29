(function (angular, app) {
  'use strict';

  app.directive('resourceSummary', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/summary/rsc_SummaryWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


