(function (angular, _) {

  var BASE_DIR = 'modules/times/',
    TEMPLATES_SUBDIR = 'templates/',
    SCHEDULE_SUBDIR = 'schedule/';

  var templates = {
    schedule: BASE_DIR + SCHEDULE_SUBDIR + TEMPLATES_SUBDIR
  };

  angular.module('times').constant('times_templates', templates)

})(window.angular, window._);