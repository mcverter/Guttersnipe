(function (angular, app) {
  'use strict';

  app.directive('resourceTaxon', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_Taxon.html';
      var buttonClass = 'button-default';
      return {
        restrict: 'E',
        templateUrl: templateUrl,
        replace: true,

        link: function (scope, element, attrs) {
          Object.defineProperties(scope, {
            name: {
              enumerable: true,
              value: attrs.name
            },
            buttonClass: {
              value: buttonClass,
              enumerable: true
            },
            changeHoverColor: {
              enumerable: true,
              value: function ($event) {
                $event.preventDefault();
                if (buttonClass === 'button-default') {
                  buttonClass = 'button-warning';
                  console.log("changing class to ", buttonClass)
                }
              }
            },
            changeClickColor: {
              enumerable: true,
              value: function ($event) {
                $event.preventDefault();
                if (buttonClass === 'button-success') {
                  buttonClass = 'button-default';
                  console.log("changing class to ", buttonClass)
                }
                else {
                  buttonClass = 'button-success';
                  console.log("changing class to ", buttonClass)
                }
              }}
          });
        }
      }
    }]
  );
})(window.angular, window.guttersnipe);


