(function (angular, app) {
  'use strict';

  app.directive('mapInput', ['filePaths', function(filePaths) {
    var templateUrl = filePaths.resources_dir + "place/" + filePaths.templates_subdir + "rsc_MapInputTemplate.html";

    return {
      restrict: 'E',
      templateUrl: templateUrl
    }
  }]);
})(window.angular, window.guttersnipe);
