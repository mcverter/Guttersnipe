
(function() {
  'use strict';

  function ResourceCreateController($scope, Resources, $state, $location, $anchorScroll, Authentication) {
    $scope.activate = activate;
    $scope.create = createResource;
    $scope.resource = {};
    $scope.scrollTo = scrollTo;
    $scope.confirmations = {
      isCreatePlaceConfirmed : false,
      isCreateTimeConfirmed : false,
      isCreateDescriptionConfirmed : false,
      isCreateClassificationConfirmed : false
    };

    activate();

    function activate() {
      $scope.resource = Resources.getEmptyResource();
    }

    function isCreateFormConfirmed() {
      return  $scope.confirmations.isCreatePlaceConfirmed &&
        $scope.confirmations.isCreateTimeConfirmed &&
        $scope.confirmations.isCreateDescriptionConfirmed &&
        $scope.confirmations.isCreateClassificationConfirmed;
    }

    function scrollTo(id) {
      $location.hash(id);
      $anchorScroll();
    }

    function createResource() {
      if (isCreateFormConfirmed()) {
        Resources.createResource($scope.resource)
          .then(function (data) {
            console.log('Returned data', data);
            $state.go('allResources');
          })
          .catch(function (err) {
            console.err('got error', err);
          });
      }
      else {
        $scope.showPlaceConfirmError =  ! $scope.confirmations.isCreatePlaceConfirmed;
        $scope.showTimeConfirmError =   ! $scope.confirmations.isCreateTimeConfirmed;
        $scope.showDescriptionConfirmError =  ! $scope.confirmations.isCreateDescriptionConfirmed;
        $scope.showClassificationConfirmError =  ! $scope.confirmations.isCreateClassificationConfirmed;
      }
    }

  }

  angular.module('resources')
    .controller('ResourcesCreateController',
    ['$scope', 'Resources', '$state', '$location', '$anchorScroll', 'Authentication', ResourceCreateController])

})();
