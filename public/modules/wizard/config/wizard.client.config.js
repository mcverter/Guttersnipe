/**
 * Created by Owner on 2/11/15.
 */

var BASE_DIR = 'modules/wizard/',
  TEMPLATES_SUBDIR = 'templates/'
  ;

var templates = {
  templateDir: BASE_DIR + TEMPLATES_SUBDIR
};

angular.module('resources')
  .constant('wizard_templates', templates)
