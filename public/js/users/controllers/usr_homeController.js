(function (angular, app) {
    'use strict';

    console.log("in the controller");
    app.controller('HomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
        var toStateTo = toState.to;
        if (toStateTo === undefined) {
          console.log("ToState" , toState, "ToParams", toParams)
        }
        console.log('$stateChangeStart to '+toStateTo+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
      });
      $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
      });
      $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
      });
// $rootScope.$on('$viewContentLoading',function(event, viewConfig){
//   // runs on individual scopes, so putting it in "run" doesn't work.
//   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
// });
      $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
      });
      $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
      });

      console.log("in the home controller");
        $scope.center = {
            lat: 40.095,
            lng: -3.823,
            zoom: 4
        };
        $scope.amsterdam = {
            lat: 52.35,
            lng: 4.91,
            zoom: 12
        };

        $scope.legend = {
            position: 'bottomleft',
            colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
            labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
        };
        $scope.defaults = {
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            tileLayerOptions: {
                opacity: 0.9,
                detectRetina: true,
                reuseTiles: true
            },
            scrollWheelZoom: false
        };
        $scope.osloCenter = {
            lat: 59.91,
            lng: 10.75,
            zoom: 12
        };
        $scope.markers = {
            osloMarker: {
                lat: 59.91,
                lng: 10.75,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            }
        };
        $scope.london = {
            lat: 51.505,
            lng: -0.09,
            zoom: 8
        };
        $scope.foo = "mew";
    }]);
})(window.angular, window.guttersnipe);

