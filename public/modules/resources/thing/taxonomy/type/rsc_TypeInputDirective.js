(function (angular, app) {
  'use strict';

  app.directive('resourceTypeInput', ['filePaths', function(filePaths) {
      var template =
        '      <div>' +
        '        <ng-form>' +
        '          <!-- make this into a directive   <img class="img-responsive" ng-src="{{resourceTaxonomy.IMG_DIR}}{{type.img}}.svg" height="30px" > -->' +
        '          <h3>Choose a resource type:</h3>' +
        '          <ul class="nav nav-pills nav-stacked center ">' +
        '            <li ng-repeat="top in resourceTaxonomy.taxonomy.top">' +
        '              <a ui-sref="resources_wizard.{{top.name}}_details">' +
        '                <resource-taxon ng-click="setType(top.name)" name="{{top.name}}"></resource-taxon>' +
        '              </a>' +
        '            </li>' +
        '          </ul>' +
        '        </ng-form>' +
        '      </div>' ;

      return {
        restrict: 'E',
        template: template
      }
    }]
  );
})(window.angular, window.guttersnipe);


