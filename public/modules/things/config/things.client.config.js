/**
 * Created by Owner on 2/11/15.
 */

var BASE_DIR = 'modules/things/',
    TEMPLATES_SUBDIR = 'templates/',
    SUMMARY_SUBDIR = 'summary/',
    TAXONOMY_SUBDIR = 'taxonomy/',
    COMMON_SUBDIR = TAXONOMY_SUBDIR + 'common/',
    FOOD_SUBDIR = TAXONOMY_SUBDIR + 'food/',
    HOUSING_SUBDIR = TAXONOMY_SUBDIR + 'housing/',
    MEDICAL_SUBDIR = TAXONOMY_SUBDIR + 'medical/',
    TYPE_SUBDIR = TAXONOMY_SUBDIR + 'type/'
    ;

var templates = {
    summary: BASE_DIR + SUMMARY_SUBDIR + TEMPLATES_SUBDIR,
    common: BASE_DIR + COMMON_SUBDIR + TEMPLATES_SUBDIR,
    food: BASE_DIR + FOOD_SUBDIR + TEMPLATES_SUBDIR,
    medical: BASE_DIR + MEDICAL_SUBDIR + TEMPLATES_SUBDIR,
    housing: BASE_DIR + HOUSING_SUBDIR + TEMPLATES_SUBDIR,
    type: BASE_DIR + HOUSING_SUBDIR + TYPE_SUBDIR

};

angular.module('things')
    .constant('things_templates', templates)
