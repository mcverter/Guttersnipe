(function (angular, app) {
  'use strict';

  app.directive('resourceTypeConfirmed', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/taxonomy/type/' + filePaths.templates_subdir + 'rsc_TypeConfirmedTemplate.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


