(function (angular, app) {
  'use strict';

  app.directive('dayPicker', function() {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_MapWidget.html';

      return {
        restrict: 'E',
        template: templateUrl
               }
    }
  );
})(window.angular, window.guttersnipe);


