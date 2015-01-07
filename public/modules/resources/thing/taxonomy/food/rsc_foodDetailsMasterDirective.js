(function (angular, app) {
  'use strict';

  app.directive('foodDetailsMaster', ['filePaths', function(filePaths) {

      var template =
        '      <div ng-if="!areDetailsSet">' +
        '        <food-details-input></food-details-input>' +
        '      </div>' +
        '      <div ng-if="areDetailsSet">' +
        '        <food-details-confirmed></food-details-confirmed>' +
        '      </div>';



      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


