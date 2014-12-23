(function (angular, app) {
  'use strict';

  app.directive('resourceTaxon', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_create_wizard + 'rsc_Taxon.html',
        selected = false,
        hovered = false;

      return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
          selected:'&',
          hovered:'&'
        },
        link: function (scope, element, attrs) {
          scope.name = attrs.name;
        }
          /*
           link: function (scope, element, attrs) {
           Object.defineProperties(scope, {
           name: {
           enumerable: true,
           value: attrs.name
           },
           selected: {

                        get: function() {
                          return selected;
                        },
                        set : function(value) {
                          selected = value;
                        },
                        enumerable: true
                      },
                      hovered: {
                        get: function() {
                          return hovered;
                        },
                        set : function(value) {
                          hovered = value;
                        },
                        enumerable: true
                      },

                      buttonClass: {
                        value: function() {
                          return buttonClass;
                        },
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
                  }*/
      }
    }]
  );
})(window.angular, window.guttersnipe);


