(function (angular, app) {
  'use strict';

  app.directive('mapConfirm', ['filePaths', function(filePaths) {
    var linker = function(scope, element, attrs) {},
      templateUrl = filePaths.resources_create_wizard + 'rsc_MapConfirmtWidget.html';

    return {
      link: linker,
      restrict: 'E',
      templateUrl: templateUrl,
      controller: 'MapController'
    };
  }]
  );
})(window.angular, window.guttersnipe);
