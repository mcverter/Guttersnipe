(function() {
  'use strict';

  function ResourceReadOneController($stateParams, Resources, Things, Places, Times) {
    var vm = this;
    vm.resource = [];
    vm.showMap = false;
    vm.rating = 0;
    vm.maxRating = 10;

    activate();

    function activate() {
      Resources.getOneResource($stateParams.resourceId)
        .then(function(rsc) {
          vm.resource = rsc;
          vm.options = {scrollwheel: false};
          var coordinates = vm.resource.place.coordinates;

          vm.map = {
            center: {
              latitude: coordinates.lat,
              longitude: coordinates.lng
            },
            marker : {
              id: 0,
              coords: {
                latitude: coordinates.lat,
                longitude: coordinates.lng
              },
              options: { draggable: false }
            },
            zoom: 16
          }
        });
    }

  }

  angular.module('resources')
    .controller('ResourcesReadOneController',
    ['$stateParams', 'Resources', 'Things', 'Places', 'Times', ResourceReadOneController])

})();
