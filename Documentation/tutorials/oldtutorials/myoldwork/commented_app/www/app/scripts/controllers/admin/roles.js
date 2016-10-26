/**
* @class AdminRoles (Controller): 
*       Puts data on scope for ../../views/admin/roles.html
        Allows admin to edit Permissions by Role
*/
(function (angular, app) {
  'use strict';

  app.controller('AdminRolesCtrl', ['$scope', '$log', '$location', '$api', '$sce', '$nav',

    function ($scope, $log, $location, $api, $sce, $nav) {
      var nav, rolePermissions;

      loadRoles();
      
      $nav.onLoad(function(){
        nav = $nav.rawNav;
        if (rolePermissions)
          buildLinks();
      });

      $scope.$watch('selectedRole', function(nv, ov){
        loadPermissions();
      });

      $scope.showRemoveModal = false;
      $scope.showCreateModal = false;
      $scope.errorMessage = '';

      $scope.categoryLink = $nav.links.admin;
      
      $scope.onAdd = function(){
        $scope.roleName = '';
        $scope.errorMessage = '';
        $scope.showCreateModal = true;
      };

      $scope.cancelAdd = function(evt){
        $scope.showCreateModal = false;  
      };

      $scope.doAdd = function(evt){
        $api.roles.put($scope.roleName).then(function(){
          $scope.showCreateModal = false;

          loadRoles();
        }, function(reason){
          $scope.errorMessage = 'Error adding role: ' + $scope.roleName;
        });
      };

      
      $scope.onRemove = function(){
        $scope.errorMessage = '';
        $scope.showRemoveModal = true;  
      };
      
      $scope.cancelRemove = function(evt){
        $scope.showRemoveModal = false;  
      };

      $scope.doRemove = function(evt){
        $api.roles.delete($scope.selectedRole).then(function(){
          $scope.showRemoveModal = false;

          loadRoles();
        }, function(reason){
          $scope.errorMessage = 'Error removing role: ' + $scope.selectedRole;
        });
      };

      $scope.onSave = function(){
        var permissions = _.reduce($scope.links, function(acc, link){
          acc.push({linkId: link.path, permission: link.permission});
          return acc;
        }, []);
        
        $api.roles.savePermissions($scope.selectedRole, permissions).then(function(data){
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

      function setPermission(link, value){
        nav.links[link].permission = value;
        _.each(nav.links[link].children, function(child){
          setPermission(child, value);
        });
      }

      function loadRoles(){
        $api.roles.get().then(function(data){
          $scope.roles = data;
          
          if ($scope.roles.length)
            $scope.selectedRole = $scope.roles[0];
        });
      }
      
      function loadPermissions(){
        $scope.permissions = null;
        $api.roles.permissions($scope.selectedRole).then(function(data){
          rolePermissions = data;
          if (nav)
            buildLinks();
        });
      }
     
      function buildLinks(){
        var links = [];
        var linkPermissions = {};
        var levels = {};
        
        _.each(rolePermissions.permissions, function(lp){
          linkPermissions[lp.linkId] = lp.permission;
        });
        
        _.each(nav.top, function(top){
          addLink(top, 0);
        });

        $scope.levels = _.keys(levels).map(function(el){
          return parseInt(el);
        });
        $scope.selectedLevel = Math.min(1, $scope.levels.length - 1);

        //need to catch any other top level links that aren't on the menu (e.g. admin items)
        _.each(nav.links, function(link){
          if (!link.parents.length && !_.contains(nav.top, link.path))
            addLink(link.path, 0);
        });
        
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

