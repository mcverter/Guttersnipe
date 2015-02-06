(function (angular, app) {
  'use strict';

  app.directive('housingDetailsMaster', ['filePaths', function(filePaths) {
      var templateUrl = filePaths.resources_dir + 'thing/taxonomy/housing/' + filePaths.templates_subdir + 'rsc_HousingDetailsMasterTemplate.html';


      return {
        restrict: 'E',
        templateUrl: templateUrl
      }
    }]
  );
})(window.angular, window.guttersnipe);


