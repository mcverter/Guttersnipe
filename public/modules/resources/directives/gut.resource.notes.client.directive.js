(function () {
  'use strict';

  angular.module('resources').directive('resourceNotes', ['resource_templates', function(templates) {
      var templateUrl = templates.main + 'resource-notes.template.html';

      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})();

