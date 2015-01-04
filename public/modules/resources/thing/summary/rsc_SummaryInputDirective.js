(function (angular, app) {
  'use strict';

  app.directive('resourceSummaryInput', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/summary/rsc_SummaryInputWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


