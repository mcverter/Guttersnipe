(function (angular, app) {
  'use strict';

  app.directive('address', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "place/rsc_MapConfirmedWidget.html";

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


