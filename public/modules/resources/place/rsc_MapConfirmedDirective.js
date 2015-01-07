(function (angular, app) {
  'use strict';

  app.directive('mapConfirmed', ['filePaths', function(filePaths) {
      var template =
        '<div>' +
        '   <em> Description </em> {{placeDescription}} <br>' +
        '   <em> Address </em> {{inputAddress}} <br>' +
        '    <leaflet markers="markers" center="center" defaults="defaults" width="640px" height="480px"></leaflet>' +
        '</div>' +
        '<a class="btn btn-warning" href="#" role="button" ng-click="isLocationSet=false">Edit</a>' ;


      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


