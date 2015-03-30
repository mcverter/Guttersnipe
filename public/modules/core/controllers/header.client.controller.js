(function () {
  'use strict';

  function HeaderController(Authentication, Menus) {
    var vm = this;
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = Menus.getMenu('topbar');

    vm.toggleCollapsibleMenu = function() {
      vm.isCollapsed = !vm.isCollapsed;
    };

    // Collapsing the menu after navigation
    vm.$on('$stateChangeSuccess', function() {
      vm.isCollapsed = false;
    });
  }
  angular.module('core').controller('HeaderController',
    ['Authentication', 'Menus', HeaderController]);
})();
