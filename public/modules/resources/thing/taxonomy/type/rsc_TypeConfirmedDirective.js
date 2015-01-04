(function (angular, app) {
  'use strict';

  app.directive('resourceTypeConfirmed', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/taxonomy/type/rsc_TypeConfirmedWidget.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


