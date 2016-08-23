/**
* @class UserMenuCtrl (Controller):

*/
(function (angular, app, _) {
  'use strict';
  app.controller('UserMenuCtrl', ['$scope', '$log', '$user',
    function ($scope, $log, $user) {
      Object.defineProperties($scope, {

        show: {
          enumerable: true,
          get: function getShow() {
            return !!$user.current;
          }
        },

        fullName: {
          enumerable: true,
          get: function getFullName() {
            return _.maybe($user, 'current.fullName');
          }
        },
        
        organizationName: {
          enumerable: true,
          get: function getOrganizationName() {
            var orgnizationFull = _.maybe($user, 'current.data.organization.path');
            if (orgnizationFull!=null && orgnizationFull.lastIndexOf('/')>1)  {
              return orgnizationFull.substring(orgnizationFull.lastIndexOf('/')+1 );
            }
            return "Unknown Organization";
          }
        },
        
        productName: {
            enumerable: true,
            get: function getProductName() {
              var productFull = _.maybe($user, 'current.data.organization.path');
              if (productFull!=null && productFull.lastIndexOf('/')>1)  {
                return productFull.substring(15, productFull.lastIndexOf('/')-14);
              }
              return "Unknown Product";
            }
          }

      });
    }]);
}) (window.angular, window.novantas, window._);