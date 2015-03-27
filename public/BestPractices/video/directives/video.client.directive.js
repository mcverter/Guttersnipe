(function () {
  'use strict';

  var template =
      '<video  class="embed-responsive embed-responsive-4by3"' +
      '   src="modules/video/content/vid_ClashGuttersnipe.mp4">' +
      '</video>',
    templateUrl = '/modules/video/templates/video.client.template.html';

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
  ]);
})();
