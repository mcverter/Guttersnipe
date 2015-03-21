(function (angular, _) {
  'use strict';;

  var BASE_DIR = 'modules/times/',
    TEMPLATES_SUBDIR = 'templates/',
    SCHEDULE_SUBDIR = 'schedule/';

  var templates = {
    main: BASE_DIR + TEMPLATES_SUBDIR,
    schedule: BASE_DIR + SCHEDULE_SUBDIR + TEMPLATES_SUBDIR
  };

  angular.module('times').constant('times_templates', templates);

})(window.angular, window._);
