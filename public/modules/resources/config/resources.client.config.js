(function () {
    'use strict';

    var BASE_DIR = 'modules/resources/',
        TEMPLATES_SUBDIR = 'templates/',
        MAIN_SUBDIR = 'main/',
        CONFIRM_SUBDIR = 'confirm/',
        INSTRUCTIONS_SUBDIR = 'instructions/',
        AGREEMENT_SUBDIR = 'agreement/'
        ;

    var templates = {
        main: BASE_DIR + TEMPLATES_SUBDIR,
        agreement: BASE_DIR + AGREEMENT_SUBDIR + TEMPLATES_SUBDIR,
        instructions: BASE_DIR + INSTRUCTIONS_SUBDIR + TEMPLATES_SUBDIR
    };

    angular.module('resources')
        .constant('resource_templates', templates);


// Configuring the Resources module
    angular.module('resources').run(['Menus',
        function (Menus) {
            // Set top bar menu items
            Menus.addMenuItem('topbar', 'Resources', 'resources', 'dropdown', '/resources(/create)?');
            Menus.addSubMenuItem('topbar', 'resources', 'List Resources', 'resources');
            Menus.addSubMenuItem('topbar', 'resources', 'New Resource', 'resources/create');
        }
    ]);

})();
