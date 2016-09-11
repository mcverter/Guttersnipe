(function () {
  'use strict';

  var BASE_DIR = 'modules/wizard/',
    TEMPLATES_SUBDIR = 'templates/'
    ;

  var templates = {
    templateDir: BASE_DIR + TEMPLATES_SUBDIR
  };

  angular.module('resources')
    .constant('wizard_templates', templates);

})();
