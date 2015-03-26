/**
 * Created by Owner on 2/11/15.
 */

var BASE_DIR = 'modules/places/',
    TEMPLATES_SUBDIR = 'templates/',
    MAP_SUBDIR = 'map/';

var templates = {
  main: BASE_DIR + TEMPLATES_SUBDIR,
    map: BASE_DIR + MAP_SUBDIR + TEMPLATES_SUBDIR
};

angular.module('places')
    .constant('places_templates', templates);
