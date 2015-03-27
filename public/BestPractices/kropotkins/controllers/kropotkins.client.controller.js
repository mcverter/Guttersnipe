(function () {
  'use strict';


// Kropotkins controller
  angular.module('kropotkins').controller('KropotkinsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Kropotkins',
    function($scope, $stateParams, $location, Authentication, Kropotkins) {
      $scope.authentication = Authentication;

      // Create new Kropotkin
      $scope.create = function() {
        // Create new Kropotkin object
        var kropotkin = new Kropotkins ({
          name: this.name
        });

        // Redirect after save
        kropotkin.$save(function(response) {
          $location.path('kropotkins/' + response._id);

          // Clear form fields
          $scope.name = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Remove existing Kropotkin
      $scope.remove = function(kropotkin) {
        if ( kropotkin ) {
          kropotkin.$remove();

          for (var i in $scope.kropotkins) {
            if ($scope.kropotkins [i] === kropotkin) {
              $scope.kropotkins.splice(i, 1);
            }
          }
        } else {
          $scope.kropotkin.$remove(function() {
            $location.path('kropotkins');
          });
        }
      };

      // Update existing Kropotkin
      $scope.update = function() {
        var kropotkin = $scope.kropotkin;

        kropotkin.$update(function() {
          $location.path('kropotkins/' + kropotkin._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Find a list of Kropotkins
      $scope.find = function() {
        $scope.kropotkins = Kropotkins.query();
      };

      // Find existing Kropotkin
      $scope.findOne = function() {
        $scope.kropotkin = Kropotkins.get({
          kropotkinId: $stateParams.kropotkinId
        });
      };
    }
  ]);
})();
