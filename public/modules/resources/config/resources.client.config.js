/**
 * Created by Owner on 2/11/15.
 */

var BASE_DIR = 'modules/resources/',
    TEMPLATES_SUBDIR = 'templates/',
    MAIN_SUBDIR = 'main/',
    CONFIRM_SUBDIR = 'confirm/',
    INSTRUCTIONS_SUBDIR = 'instructions/'
    ;

var templates = {
    main: BASE_DIR + MAIN_SUBDIR + TEMPLATES_SUBDIR
};

angular.module('resources')
    .constant('templates', templates)
