(function (angular, _) {
  'use strict';

  angular.module('things').directive('housingDetailsMaster', ['things_templates', function(templates) {
      var templateUrl = templates.main  + 'gut.thing.housing-master.client.template.html';


      return {
        restrict: 'E',
        templateUrl: templateUrl
      };
    }]
  );
})(window.angular,  window._);


