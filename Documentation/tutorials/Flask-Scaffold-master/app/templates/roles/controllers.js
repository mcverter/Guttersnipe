angular.module('myApp.services').factory('Role', function($resource) {
  return $resource('api/v1/roles/:id.json', { id:'@roles.id' }, {
    update: {
      method: 'PATCH',



    }
    }, {
    stripTrailingSlashes: false
    });
});


angular.module('myApp.controllers').controller('RoleListController', function($scope, $state,  Role, $auth, toaster) {
 //Table header definitions
        var columnDefs = [ {headerName: "Sr No", cellRenderer: function(params) {return params.node.id + 1;} },
                             {headerName: "name", field: "name", width: 300 },


                            ];
        $scope.gridOptions = { columnDefs: columnDefs,
                               rowData: null,
                               enableSorting: true,
                               enableColResize: true,
                               rowSelection: 'single',};
        Role.get(function(data) {
                     $scope.roles = [];
                     angular.forEach(data.data, function(value, key)
                                                        {
                                                       this.role = value.attributes;
                                                       this.role['id'] = value.id;
                                                       this.push(this.role);
                                                        },   $scope.roles);
                    $scope.gridOptions.rowData = $scope.roles;
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


   $scope.deleteRole = function(selected_id) { // Delete a Role. Issues a DELETE to /api/roles/:id
      role = Role.get({ id: selected_id});
      role.$delete({ id: selected_id},function() {
        toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Role deleted successfully",
                showCloseButton: true,
                timeout: 0
                });
        $state.go('roles'); //redirect to home
        $state.reload();
      }, function(error) {
         toaster.pop({
                type: 'error',
                title: 'Error',
                body: error,
                showCloseButton: true,
                timeout: 0
                });;
    });
    };

}).controller('RoleEditController', function($scope, $state, $stateParams, toaster, $window, Role) {
      $scope.loading = false;
     $scope.updateRole = function() { //Update the edited site. Issues a PUT to /api/sites/:id

     $scope.loading = true;
    $scope.role.$update({ id: $stateParams.id },function() {
     toaster.pop({
                type: 'success',
                title: 'Sucess',
                body: "Update was a success",
                showCloseButton: true,
                timeout: 0
                });

       $state.go('roles.list');
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


  $scope.loadRole = function() { //Issues a GET request to /api/roles/:id to get a role to update
                       $scope.role = Role.get({ id: $stateParams.id },
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

  $scope.loadRole(); // Load a role
  }).controller('RoleCreateController', function($scope, $state, Role, toaster) {
          $scope.role = new Role();  //create new site instance. Properties will be set via ng-model on UI
          $scope.loading = false;

         $scope.addRole = function() { //create a new site. Issues a POST to /api/sites
                                $scope.loading = true;
                                $scope.role.data.type = "roles";
                                $scope.role.$save(function() {
                                toaster.pop({
                                            type: 'success',
                                            title: 'Sucess',
                                            body: "Role saved successfully",
                                            showCloseButton: true,
                                            timeout: 0
                                            });
                                    $state.go('roles.list');
                                    $scope.loading = false;
                                 
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
