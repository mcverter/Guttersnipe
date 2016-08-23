(function (angular, app) {
  'use strict';
  app.controller('UserAdminCtrl', ['$scope', '$log', '$session', '$location', '$api',
 
    function ($scope, $log, $session, $location, $api) {

      $scope.selectedUser = null;
      $scope.selectedRoles = null;
      $scope.selectedbranches = null;

      $api.admin.getUsers().then(function(result){
        $scope.users = result;
      });

      $api.admin.getBranches().then(function(result){
        console.log($scope.branches);
        $scope.branches = result;
      });

      $api.admin.getRoles().then(function(result){
        $scope.roles = result;
      });
    
      $scope.userChanged = function () {

        $api.admin.getUserBranches($scope.selectedUser.id).then(function (result) {
          $scope.selectedBranches = result;

          console.log($scope.selectedBranches);
        });

        $api.admin.getUserRoles($scope.selectedUser.id).then(function (result) {
          var map = {};
          _.each(result, function (i) { map[i] = true; });

          $scope.selectedRoles = _.filter($scope.roles, function (item) {
            return map[item.id];
          });

        });
      };
      
      $scope.rolesChanged = function () {

      };
      
    
    }]);
}) (window.angular, window.novantas);

