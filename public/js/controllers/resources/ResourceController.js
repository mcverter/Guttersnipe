(function (angular, app) {
    'use strict';

    app.controller('ResourceCtrl', ['$scope', '$compile', // general
        'uiCalendarConfig', // place
        '$locationService', // time
        '$resourceTaxonomyService', //kind
        function ($scope, $compile, uiCalendarConfig,
                  $locationService, $resourceTaxonomyService){


            Object.defineProperties($scope, {
              resourceTypes : {
                  enumerable: true,
                  get: function getResourceTypes() {
                      return $resourceTaxonomyService.resourceTypes;
                  }
              },
                resourceDetails : {
                    enumerable: true,
                    get function getResourceDetails(type) {
                        return $resourceTaxonomyService[type];
                    }
                }

            })


    }]);
})(window.angular, window.guttersnipe);

