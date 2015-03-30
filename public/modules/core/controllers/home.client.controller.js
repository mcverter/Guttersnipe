(function () {
  'use strict';

    function HomeController (Authentication) {
      var vm = this;
      // This provides Authentication context.
      this.authentication = Authentication;
    }

  angular.module('core').controller('HomeController', ['$scope', 'Authentication', HomeController]);
})();
