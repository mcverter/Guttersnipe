(function (angular, app, _, $) {
  'use strict';

  app.directive('formAutoFillFix', ['$log', '$window', '$timeout',
    function ($log, $window, $timeout) {
      /*
       * IMPORTANT! jQuery must be loaded first in index.html otherwise the event triggering
       * will not work and this directive will seem broken.  Load jQuery before angular in index.html so that
       * angular does not use jqlite until jquery full is loaded.
       */
      return {
        restrict: 'A',
        replace: false,
        link: function (scope, element, attrs) {
          var $form = $(element),
            submitAttr = attrs.ngSubmit;

          if (submitAttr) {
            $form.off('submit')
              .on('submit', function submitForm($event) {
                $event.preventDefault();

                $form.find('input, textarea, select').each(function triggerInputUpdate() {
                  var $input = $(this);
                  $input.trigger('input');
                  $input.trigger('change');
                  $input.trigger('keydown');
                });

                $timeout(function () {
                  $log.debug('Triggering Default Submit Handler', submitAttr);
                  scope.$apply(submitAttr);
                });
              });
          }
        }
      }
    }]);

}) (window.angular, window.novantas, window._, window.jQuery);