(function (angular, app, _) {
  'use strict';

  app.directive('fillY', ['$log', '$window',
    function ($log, $window) {
      return {
        restrict: 'C',
        replace: false,
        link: function (scope, element, attrs) {
          var $element = $(element),
            oldHeight = -5,
            height = function getHeight() {
              var newHeight = ($window.innerHeight - $element.offset().top);

              if (Math.abs(newHeight - oldHeight) > 2) {
                oldHeight = newHeight;
                return newHeight + 'px';
              }

              return oldHeight;
            };

            scope.$watch(height, function heightWatch(newValue, oldValue) {
              $element.height(newValue);
            });
          }
        };
      }]);

}) (window.angular, window.novantas, window._);