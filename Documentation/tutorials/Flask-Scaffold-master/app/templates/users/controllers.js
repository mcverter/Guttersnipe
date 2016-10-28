angular.module('myApp.services').factory('User', function($resource) {
  return $resource('api/v1/users/:id.json', { id:'@users.id' }, {
    update: {
      method: 'PATCH',



    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('UserListController', function($scope, $state,  User, $auth, toaster) {
 //Table header definitions
        var columnDefs = [ {headerName: "Sr No", cellRenderer: function(params) {return params.node.id + 1;}},
                             {headerName: "email", field: "email", width: 300 },
                             {headerName: "name", field: "name", width: 300 },
                             {headerName: "active", field: "active", width: 300 },
                             {headerName: "creation_time", field: "creation_time", width: 300 },
                             {headerName: "modification_time", field: "modification_time", width: 300 },
                             {headerName: "role", field: "role", width: 300 },


                            ];
        $scope.gridOptions = { columnDefs: columnDefs,
                               rowData: null,
                               enableSorting: true,
                               enableColResize: true,
                               rowSelection: 'single',};
        User.get(function(data) {
                     $scope.users = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.user = value.attributes;
                                                       this.user['id'] = value.id;
                                                       this.push(this.user);
                                                        },   $scope.users);
                    $scope.gridOptions.rowData = $scope.users;
                    $scope.gridOptions.api.onNewRows();
                    $scope.gridOptions.api.sizeColumnsToFit();
                               },
                function(error){

                     toaster.pop({
                            type: 'error',
                            title: 'Error',
                            body: error,
                            showCloseButton: true,
                            timeout: 0
                            });
                                              });


   $scope.deleteUser = function(selected_id) { // Delete a User. Issues a DELETE to /api/users/:id
      user = User.get({ id: selected_id});
      user.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "User deleted successfully",
                showCloseButton: true,
                timeout: 0
                });
        $state.go('users'); //redirect to home
        $state.reload();
      }, function(error) {
         toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });
    });
    };

}).controller('UserEditController', function($scope, $state, $stateParams, Role, toaster, $window,  User) {

        Role.get(function(data) {
                     $scope.roles = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.role = value.attributes;

                                                       this.push(this.role);
                                                        },   $scope.roles);

                               },
                function(error){
                     toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error.data,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                              });
      $scope.loading = false;
     $scope.updateUser = function() { //Update the user. Issues a PUT to /v1/api/users/:id

     $scope.loading = true;
    $scope.user.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });


       $scope.loading = false;
      //$state.go('sites'); // on success go back to home i.e. sites state.
    }, function(error) {
    toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });
      $scope.loading = false;
    });
  };


  $scope.loadUser = function() { //Issues a GET request to /api/users/:id to get a user to update
                       $scope.user = User.get({ id: $stateParams.id },
                                       function() {}, function(error) {
                                          toaster.pop({
                                                type: 'error',
                                                title: 'Error',
                                                body: error,
                                                showCloseButton: true,
                                                timeout: 0
                                                });
                                                });
                                };

  $scope.loadUser(); // Load a user
  }).controller('UserCreateController', function($scope, $state, User, Role, toaster) {

          $scope.user = new User();  //create new site instance. Properties will be set via ng-model on UI
          $scope.loading = false;
          $scope.user.data = {attributes: {active:0}}
          Role.get(function(data) {
                     $scope.roles = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.role = value.attributes;

                                                       this.push(this.role);
                                                        },   $scope.roles);

                               },
                function(error){
                     toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error.data,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                              });


         $scope.addUser = function() { //create a new site. Issues a POST to /api/sites
                                $scope.loading = true;
                                $scope.user.data.type = "users";
                                $scope.user.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "User saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                   $scope.loading = false;
                                  $state.go('users'); // on success go back to home i.e. sites state.
                                }, function(error) {
                                toaster.pop({
                                            type: 'error',
                                            title: 'Error',
                                            body: error,
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                 $scope.loading = false;
                                           });
                                 };
});
