(function (angular, app) {
  'use strict';

  app.directive('resourceHousingDetails', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_HousingDetailsWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


