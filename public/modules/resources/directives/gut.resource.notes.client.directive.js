(function () {
  'use strict';

  angular.module('resources').directive('gutResourceNotes', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-notes.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})();

