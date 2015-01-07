(function (angular, app) {
  'use strict';

  app.directive('housingDetailsMaster', ['filePaths', function(filePaths) {
      var template =
        '      <div ng-if="!areDetailsSet">' +
        '        <housing-details-input></housing-details-input>' +
        '      </div>' +
        '      <div ng-if="areDetailsSet">' +
        '        <housing-details-confirmed></housing-details-confirmed>' +
        '      </div>';

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


