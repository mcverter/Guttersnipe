(function (angular, app) {
  'use strict';

  app.directive('resourceFoodDetails', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_FoodDetailsWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


