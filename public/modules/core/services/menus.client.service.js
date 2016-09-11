(function () { 'use strict';
    function MenuService() {
      var self = this;

      self.defaultRoles = ['*'];
      self.menus = {};
      self.validateMenuExistance = validateMenuExistance;
      self.getMenu = getMenu;
      self.addMenu = addMenu;
      self.removeMenu = removeMenu;
      self.addMenuItem = addMenuItem;
      self.addSubMenuItem = addSubMenuItem;
      self.removeMenuItem = removeMenuItem;
      self.removeSubMenuItem = removeSubMenuItem;

      //Adding the topbar menu
      self.addMenu('topbar');


      // Validate menu existance
       function validateMenuExistance(menuId) {
        if (menuId && menuId.length) {
          if (self.menus[menuId]) {
            return true;
          } else {
            throw new Error('Menu does not exists');
          }
        } else {
          throw new Error('MenuId was not provided');
        }

        return false;
      };

      // Get the menu object by menu id
      function getMenu(menuId) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Return the menu object
        return self.menus[menuId];
      };

      // Add new menu object by menu id
      function addMenu (menuId, isPublic, roles) {
        // Create the new menu
        self.menus[menuId] = {
          isPublic: isPublic || false,
          roles: roles || self.defaultRoles,
          items: [],
          shouldRender: shouldRender
        };

        // Return the menu object
        return self.menus[menuId];
      };

      // Remove existing menu object by menu id
      function removeMenu(menuId) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Return the menu object
        delete self.menus[menuId];
      };

      // Add menu item object
      function addMenuItem (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Push new menu item
        self.menus[menuId].items.push({
          title: menuItemTitle,
          link: menuItemURL,
          menuItemType: menuItemType || 'item',
          menuItemClass: menuItemType,
          uiRoute: menuItemUIRoute || ('/' + menuItemURL),
          isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? self.menus[menuId].isPublic : isPublic),
          roles: ((roles === null || typeof roles === 'undefined') ? self.menus[menuId].roles : roles),
          position: position || 0,
          items: [],
          shouldRender: shouldRender
        });

        // Return the menu object
        return self.menus[menuId];
      };

      // Add submenu item object
      function addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Search for menu item
        for (var itemIndex in self.menus[menuId].items) {
          if (self.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
            // Push new submenu item
            self.menus[menuId].items[itemIndex].items.push({
              title: menuItemTitle,
              link: menuItemURL,
              uiRoute: menuItemUIRoute || ('/' + menuItemURL),
              isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? self.menus[menuId].items[itemIndex].isPublic : isPublic),
              roles: ((roles === null || typeof roles === 'undefined') ? self.menus[menuId].items[itemIndex].roles : roles),
              position: position || 0,
              shouldRender: shouldRender
            });
          }
        }

        // Return the menu object
        return self.menus[menuId];
      };

      // Remove existing menu object by menu id
      function removeMenuItem(menuId, menuItemURL) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Search for menu item to remove
        for (var itemIndex in self.menus[menuId].items) {
          if (self.menus[menuId].items[itemIndex].link === menuItemURL) {
            self.menus[menuId].items.splice(itemIndex, 1);
          }
        }

        // Return the menu object
        return self.menus[menuId];
      };

      // Remove existing menu object by menu id
      function removeSubMenuItem(menuId, submenuItemURL) {
        // Validate that the menu exists
        self.validateMenuExistance(menuId);

        // Search for menu item to remove
        for (var itemIndex in self.menus[menuId].items) {
          for (var subitemIndex in self.menus[menuId].items[itemIndex].items) {
            if (self.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
              self.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
            }
          }
        }
        // Return the menu object
        return self.menus[menuId];
      };

      // A private function for rendering decision
      var shouldRender = function(user) {
        if (user) {
          if (!!~self.roles.indexOf('*')) {
            return true;
          } else {
            for (var userRoleIndex in user.roles) {
              for (var roleIndex in self.roles) {
                if (self.roles[roleIndex] === user.roles[userRoleIndex]) {
                  return true;
                }
              }
            }
          }
        } else {
          return self.isPublic;
        }
        return false;
      };
    }

  angular.module('core').service('Menus', [MenuService]);
})();
