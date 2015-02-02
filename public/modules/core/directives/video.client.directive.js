'use strict';
var template =
    '<video ' +
    '   src="modules/core/video/vid_ClashGuttersnipe.mp4">' +
    '</video>',
  templateUrl = 'modules/core/directives/video.client.template.html';

angular.module('core').directive('gutVideo', [
	function() {
    console.log('In video directive');
		return {
      templateUrl: templateUrl,
			restrict: 'ACE',
			link: function postLink(scope, element, attrs) {
				var src = attrs.src;
        console.log('source is ', src);
			}
		};
	}
]);