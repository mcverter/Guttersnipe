(function (angular, _) {
  'use strict';

  var template =
      '<video ' +
      '   src="modules/video/content/vid_ClashGuttersnipe.mp4">' +
      '</video>',
    templateUrl = '/modules/video/views/video.client.template.html';

  angular.module('core').directive('gutVideo', [
    function () {
      return {
        templateUrl: templateUrl,
        restrict: 'ACE',
        link: function postLink(scope, element, attrs) {
          var src = attrs.src;
        }
      };
    }
  ])
})(window.angular, window._);