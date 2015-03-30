/**
* @class AdminUsersCtrl (Controller):
*       Puts data on scope for ../../views/admin/users.html
        Allows admin to edit Permissions by User
*/
(function (angular, app) {
  'use strict';

  app.controller('AdminUsersCtrl', ['$scope', '$log', '$location', '$api', '$nav',

    function ($scope, $log, $location, $api, $nav) {
      var nav, userPermissions, rolePermissions = {};
    
      loadUsers();

      $api.roles.get().then(function(data){
        $scope.roles = data;
      });
      
      $nav.onLoad(function(){
        nav = $nav.rawNav;
        if (userPermissions)
          buildLinks();
      });
      
      $scope.$watch('selectedUser', function(nv, ov){
        if (nv !== ov)
          loadPermissions();
      });

      $scope.$watch('currentUser.roleName', function(nv, ov){
        loadRolePermissions();
      });

      $scope.showRemoveModal = false;
      $scope.showCreateModal = false;
	  $scope.showResetModal = false;
      $scope.errorMessage = '';

      $scope.categoryLink = $nav.links.admin;
      
      $scope.onSave = function(){
        var permissions = _.reduce($scope.links, function(acc, link){
          acc.push({linkId: link.path, permission: link.permission});
          return acc;
        }, []);
        
        $api.users.savePermissions($scope.selectedUser, {
              permissions: permissions,
              user: $scope.currentUser              
        }).then(function(data){
          $scope.showFlashNotification('Save complete', 2000);
          loadPermissions();
        });
      };

      $scope.showLevel = function(level){
        $scope.selectedLevel = level;
      }

      $scope.setPermission = function(link, value){
        setPermission(link.path, value);
      }

      $scope.getPermission = function(link){
        if ($scope.getRolePermission(link) == 0)
          return 0;
        
        return nav.links[link.path].permission;
      }

      $scope.getRolePermission = function(link){
        return _.isUndefined(rolePermissions[link.path])?1:rolePermissions[link.path];
      }

      //add user  
      $scope.onAdd = function(){
        $scope.newUserName = '';
        $scope.errorMessage = '';
        $scope.newUser = {
          roleName: 'normal_user'
        };
        $scope.showCreateModal = true;
      };

      $scope.cancelAdd = function(evt){
        $scope.showCreateModal = false;  
      };

      $scope.doAdd = function(evt){
        $api.users.put($scope.newUserName, $scope.newUser).then(function(data){
            $scope.showCreateModal = false;  
            loadUsers();
          }, function(msg){
            $scope.errorMessage = 'Error adding user';
          }
        );
      };
      
      //delete user
      $scope.onRemove = function(){
        $scope.errorMessage = '';
        $scope.showRemoveModal = true;  
      };
      
      $scope.cancelRemove = function(evt){
        $scope.showRemoveModal = false;  
      };

      $scope.doRemove = function(evt){
        $api.users.delete($scope.selectedUser).then(function(){
          $scope.showRemoveModal = false;

          loadUsers();
        }, function(reason){
          $scope.errorMessage = 'Error removing user: ' + $scope.selectedUser;
        });
      };
      
      // reset user
      $scope.onReset = function(){
        $scope.errorMessage = '';
        $scope.showResetModal = true;  
      };
      
      $scope.cancelReset = function(evt){
        $scope.showResetModal = false;  
      };

      $scope.doReset = function(evt){
        $api.users.reset($scope.selectedUser).then(function(){
          $scope.showResetModal = false;
        }, function(reason){
          $scope.errorMessage = 'Error resetting user: ' + $scope.selectedUser;
        });
      };


      function setPermission(link, value){
        nav.links[link].permission = value;
        _.each(nav.links[link].children, function(child){
          setPermission(child, value);
        });
      }
      
      function loadUsers(){
        $api.users.get().then(function(data){
          $scope.users = data;
          
          if (data)
            $scope.selectedUser = data[0];
        });
      }
    
      function loadRolePermissions(){
        if (!$scope.currentUser || !$scope.currentUser.roleName){
          rolePermissions = {};
          return;
        }

        $api.roles.effectivePermissions($scope.currentUser.roleName).then(function(data){
          rolePermissions = {};
          _.each(data.permissions, function(link){
            rolePermissions[link.linkId] = link.permission;
          });
        });
      }

      function loadPermissions(){
        $scope.permissions = null;
        $api.users.permissions($scope.selectedUser).then(function(data){
          userPermissions = data;
          $scope.currentUser = data.user;
          if (nav)
            buildLinks();
        });
      }

      function buildLinks(){
        var links = [];
        var linkPermissions = {};
        var levels = {};
        
        _.each(userPermissions.permissions, function(lp){
          linkPermissions[lp.linkId] = lp.permission;
        });
        
        _.each(nav.top, function(top){
          addLink(top, 0);
        });

        //need to catch any other top level links that aren't on the menu (e.g. admin items)
        _.each(nav.links, function(link){
          if (!link.parents.length && !_.contains(nav.top, link.path))
            addLink(link.path, 0);
        });
        
        $scope.levels = _.keys(levels).map(function(el){
          return parseInt(el);
        });
        $scope.selectedLevel = Math.min(1, $scope.levels.length - 1);
        
        function addLink(link, level){
          if (!nav.links[link])
            return;

          levels[level] = true;
          links.push (_.extend(nav.links[link], {permission: _.isUndefined(linkPermissions[link])?1:linkPermissions[link], level: level}));
          _.each(nav.links[link].children, function(child){
            addLink(child, level + 1);
          });
        }
        
        $scope.links = links;
      }
      
      
    }]);
}) (window.angular, window.novantas);

