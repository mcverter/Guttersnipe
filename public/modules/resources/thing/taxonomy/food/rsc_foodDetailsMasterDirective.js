(function (angular, app) {
  'use strict';

  app.directive('foodDetailsMaster', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + "thing/taxonomy/food/rsc_FoodDetailsMasterWidget.html";

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


