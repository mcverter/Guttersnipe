(function () {
  'use strict';

  function apiFactory ($log, $debug, $config, $http, $q) {
    var  api = {
        users: {
          getAll: getAllUsers,
          getOne: getOneUser,
          delete: deleteUser,
          put: putUser,
          post: postUser
        },
        kropotkins: {
          getRandom: getRandomKropotkin
        },
        resources: {
          getAll: getAllResources,
          getOne: getOneResource,
          delete: deleteResource,
          put: putResource,
          post: postResource
        }
      },

      apiUri = '',
      apiResource = function apiResource() {
        return apiUri.clone();
      },
      resourceUri = '',
      resourceResource = function apiResource() {
        return resourceUri.clone();
      },
      kropotkinUri = '',
      kropotkinResource = function apiResource() {
        return kropotkinUri.clone();
      },
      userUri = '',
      userResource = function apiResource() {
        return userUri.clone();
      },

      /**
       *  The following keys are used to repopulate the
       *    client-side services/factories after an event
       *    that changes the data available on the server
       */
      afterLoginEventKey = '$api.afterLogin',
      afterUpdateLoginEventKey = '$api.updateLogin',
      afterLogoutEventKey = '$api.afterLogout',
      afterResourceUpdateEventKey = '$api.afterResourceUpdate';


    function getAllResources() {
      $log.debug('api.resource.getAll');

      var request = {
        withCredentials: false,
        method: GET,
        url: resourcesResource().toString()
      };

      return $http(request)
        .then(function getResourcesAllSuccess(response) {
          $log.info('api.resources.getAll success ', response.data);
          return response.data;
        },
        function getResourcesAllError(response) {
          $log.error('api.resources.getAll failure', response.status, response.data);
          return response.data;
        });
    }

    function getOneResource() {}

    function deleteResource(resource) {
      $log.debug('api.resources.delete');

      var request = {
        withCredentials: true,
        method: DELETE,
        url: resourcesResource().toString()
      };

      $log.debug('api.resources.delete request', request);

      return $http(request)
        .then(function deleteResourceSuccess(response) {
          $log.debug('api.resources.delete success', response.data);
          return response.data;
        },
        function deleteResourceError(response) {
          $log.error('api.categories.resources.delete failure', response.status, response.data);
          return response.data;
        });
    }


    function postResource(resourceData) {
      $log.debug('api.resource.post');

      var request = {
        withCredentials: true,
        method: POST,
        url: resourceResource().toString(),
        data: resourceData || {}
      };

      $log.debug('api.resource.post request', request);

      return $http(request).then(function afterPostResource() {
        _.trigger(afterResourceUpdateEventKey);
      });
    }
    function putResource(resource) {
      $log.debug('api.resources.put');

      var request = {
        withCredentials: true,
        method: PUT,
        url: resourcesResource().toString()
      };

      $log.debug('api.resources.put request', request);

      return $http(request)
        .then(function putResourceSuccess(response) {
          $log.debug('api.resources.put success', response.data);
          return response.data;
        },
        function putResourceError(response) {
          $log.error('api.resources.put failure', response.data);
          return response.data;
        });
    }


    function onUpdateResource(handler) {
      _.on(afterReportUpdateEventKey, handler);
    }


    /* **********

     users

     */

    function getOneUser() {}

    function getAllUsers() {
      $log.debug('api.user.getAll');

      var request = {
        withCredentials: false,
        method: GET,
        url: usersResource().toString()
      };

      return $http(request)
        .then(function getUsersAllSuccess(response) {
          return response.data;
        },
        function getNavigationAllError(response) {
          $log.error('api.navigation.getAll failure', response.data);
          return response.data;
        });
    }

    function getOneUser() {}


    function deleteUser(user) {
      $log.debug('api.users.delete');

      var request = {
        withCredentials: true,
        method: DELETE,
        url: usersResource().toString()
      };

      $log.debug('api.users.delete request', request);

      return $http(request)
        .then(function deleteUserSuccess(response) {
          $log.debug('api.users.delete success', response.data);
          return response.data;
        },
        function deleteUserError(response) {
          $log.error('api.categories.users.delete failure', response.data);
          return response.data;
        });
    }


    function postUser(userData) {
      $log.debug('api.user.post');

      var request = {
        withCredentials: true,
        method: POST,
        url: userUser().toString(),
        data: userData || {}
      };

      $log.debug('api.user.post request', request);

      return $http(request).then(function afterPostUser() {
        _.trigger(afterUserUpdateEventKey);
      });
    }
    function putUser(user) {
      $log.debug('api.users.put');

      var request = {
        withCredentials: true,
        method: PUT,
        url: usersResource().toString()
      };

      $log.debug('api.users.put request', request);

      return $http(request)
        .then(function putUserSuccess(response) {
          $log.debug('api.users.put success', response.data);
          return response.data;
        },
        function putUserError(response) {
          $log.error('api.users.put failure', response.data);
          return response.data;
        });
    }


    function onUpdateUser(handler) {
      _.on(afterReportUpdateEventKey, handler);
    }

    /* **********
     kropotkins
     */

    function getOneKropotkin() {}


    function getAllKropotkins() {
      $log.debug('api.kropotkin.getAll');

      var request = {
        withCredentials: false,
        method: GET,
        url: kropotkinsResource().toString()
      };

      return $http(request)
        .then(function getKropotkinsAllSuccess(response) {
          return response.data;
        },
        function getNavigationAllError(response) {
          $log.error('api.navigation.getAll failure', response.data);
          return response.data;
        });
    }

    function getOneKropotkins() {}


    function deleteKropotkin(kropotkin) {
      $log.debug('api.kropotkins.delete');

      var request = {
        withCredentials: true,
        method: DELETE,
        url: kropotkinsResource().toString()
      };

      $log.debug('api.kropotkins.delete request', request);

      return $http(request)
        .then(function deleteKropotkinSuccess(response) {
          $log.debug('api.kropotkins.delete success', response.data);
          return response.data;
        },
        function deleteKropotkinError(response) {
          $log.error('api.categories.kropotkins.delete failure', response.data);
          return response.data;
        });
    }


    function postKropotkin(kropotkinData) {
      $log.debug('api.kropotkin.post');

      var request = {
        withCredentials: true,
        method: POST,
        url: kropotkinKropotkin().toString(),
        data: kropotkinData || {}
      };

      $log.debug('api.kropotkin.post request', request);

      return $http(request).then(function afterPostKropotkin() {
        _.trigger(afterKropotkinUpdateEventKey);
      });
    }
    function putKropotkin(kropotkin) {
      $log.debug('api.kropotkins.put');

      var request = {
        withCredentials: true,
        method: PUT,
        url: kropotkinsResource().toString()
      };

      $log.debug('api.kropotkins.put request', request);

      return $http(request)
        .then(function putKropotkinSuccess(response) {
          $log.debug('api.kropotkins.put success', response.data);
          return response.data;
        },
        function putKropotkinError(response) {
          $log.error('api.kropotkins.put failure', response.data);
          return response.data;
        });
    }


    function onUpdateKropotkin(handler) {
      _.on(afterReportUpdateEventKey, handler);
    }
  }

    angular.module('api')
        .factory('$api', ['$log', '$debug',  '$config', '$http', '$q', apiFactory]);
})();
