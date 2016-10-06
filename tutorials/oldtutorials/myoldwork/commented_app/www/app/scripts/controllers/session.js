/**
* @class SessionCtrl (Controller):
*/
(function (angular, app) {
  'use strict';
  app.controller('SessionCtrl', ['$scope', '$log', '$routeParams', '$api', '$location', '$config', '$sce', '$nav', '$timeout', '$help', '$interpolate', '$q',
    function ($scope, $log, $routeParams, $api, $location, $config, $sce, $nav, $timeout, $help, $interpolate, $q) {

      var notifications = {},
          authErrorMessage,
          confirmedPassword,
          newPassword,
          resetPasswordModal,
          requestResetPasswordModal,
          busy = {},
          helpEnabled = false,
          hideChrome = $location.search().hc === '1';
       
      var flashNotification;

      Object.defineProperties($scope, {
        notifications: {
          enumerable: true,
          get: function getNotifications() {
            return notifications;
          }
        },

        flashNotification: {
          enumerable: true,
          get: function getFlashNotification() {
            return flashNotification;
          }
        },

        showError: {
          enumerable: true,
          value: function(message){
            this.showNotification('error_msg_' + Math.random(), {
              type: 'danger',
              message: $sce.trustAsHtml('<strong>' + message + '</strong>')
            }, 5000);
          }
        },

        showFlashNotification: {
          enumerable: true,
          value: function showFlashNotification(notification, duration) {
            $log.debug('Flashing notification', notification, duration);
            flashNotification = notification;
            
            $timeout(function(){
              flashNotification = null;
            }, duration);
          }
        },

        showDownloadLink: {
          enumerable: true,
          value: function(link){
	    var key = 'download_' + link;

            this.showNotification(key, {
              type: 'info',
              message: $sce.trustAsHtml($interpolate('<strong><a href="' + link + '" target="_blank" onclick="$(this).scope().hideDownloadLink(\'' + key + '\')"><span class="fa fa-file"></span> Click here to download your exported file</a></strong>')(this))
            });
          }
        },
        
        hideDownloadLink: {
          enumerable: true,
          value: function(link){
            var self = this;
            
            //assumed to be called from a javascript event
            $scope.$apply(function(){
              self.hideNotification(link);
            });
          }
        },

        beginAction: {
          enumerable: true,
          value: function beginAction(type, message) {
            busy[type] = message;
          }
        },
        
        endAction: {
          enumerable: true,
          value: function endAction(type) {
            delete busy[type];
          }
        },

        resolvedPromise: {
          enumerable: true,
          value: function resolvedPromise(data) {
            var deferred = $q.defer();
            deferred.resolve(data);
            return deferred.promise;
          }
        },

        waitFor: {
          enumerable: true,
          value: function endAction(fnTest) {
            if (fnTest())
              return $scope.resolvedPromise();
    
            var deferred = $q.defer();
            
            var unregister = $scope.$watch(fnTest, function(nv, ov){
              if (nv){
                deferred.resolve(nv);
                unregister();
              }
            });
            
            return deferred.promise;
          }
        },

        busy: {
          enumerable: true,
          get: function getBusy() {
            return !_.isEmpty(busy);
          }
        },
         
        busyTitle: {
          enumerable: true,
          get: function getBusyTitle() {
            return _(busy).values().first();
          }
        },

       showNotification: {
          enumerable: true,
          value: function showNotification(key, notification, duration) {
            var self = this;
            $log.info('Showing notification', key, notification);
            self.notifications[key] = notification;
            
            if (duration) {
              $timeout(function(){
                self.hideNotification(key);
              }, duration);
            }
          }
        },

        hideNotification: {
          enumerable: true,
          value: function hideNotification(key) {
            $log.debug('Hiding notification', key, notifications[key]);
            delete notifications[key];
          }
        },

        login: {
          enumerable: true,
          value: function login(credential) {
            var self = this,
              returnTo = $routeParams.returnTo || '/',
              username = credential.username,
              password = credential.password,
              organization = credential.organization;

            $api.$login(username, password, organization).then(
              function () {
                self.hideNotification('auth');
                $log.debug('Return To', returnTo);
                $location.search('returnTo', null).path(returnTo || '/');
              }, 
              function (reason) {
                $log.debug('Authentication error, reason:', reason.data);
                if (reason.data.dataKey!=null && reason.data.dataKey.ldapReason=='CP') {
                  resetPasswordModal = true;
                }
                else if (reason.data.dataKey!=null && reason.data.dataKey.ldapReason=='BK')  {
                  self.showNotification('auth', { type: 'danger', message: $sce.trustAsHtml('<strong>Authentication error!</strong> Account is blocked. Please reset it by Admin.') });
                }
                else {
                  self.showNotification('auth', { type: 'danger', message: $sce.trustAsHtml('<strong>Authentication error!</strong> Bad credentials, please try again') });
                }
              }
            );
          }
        },
        
        updateLogin: {
          enumerable: true,
          value: function updateLogin(credential, $event) {
            $event.preventDefault();
            
            authErrorMessage = "";
            
            var self = this,
              returnTo = $routeParams.returnTo || '/',
              username = credential.username,
              password = credential.password;
            
            if (resetPasswordModal)  {
              if (angular.isUndefined(newPassword) || newPassword === null) {
                authErrorMessage = "Password is required!";
                return;               
              }
              if (confirmedPassword != newPassword)  {
            authErrorMessage = "Password does not match!";
            return;
          }
        }

        $api.$updateLogin(username, password, newPassword).then(function () {
          $log.debug('updateLogin returnto', returnTo);
          resetPasswordModal = false;
          self.hideNotification('auth');
          $location.search('returnTo', null).path(returnTo || '/');
        }, 
        function (reason) {
          $log.debug('Reset password login error, reason:', reason.data);
          if (reason.data.dataKey!=null && reason.data.dataKey.ldapReason=='CO')  {
            authErrorMessage = "Password does not meet requirement! (e.g. At least one capital letter and two digits; not in history)";
          }
          else {
            authErrorMessage = "Reset password error!";
          }
        });
      }
    },

        logout: {
          enumerable: true,
          value: function logout($event) {
            $event.preventDefault();

            $api.$logout();
            $location.search('returnTo', $location.url()).path('/security/login');
          }
        },

        requestResetPasswordModal: {
          enumerable: true,
          get: function getRequestResetPasswordModal() {
            return _.toBoolean(requestResetPasswordModal);
          }
        },

        requestResetPassword: {
          enumerable: true,
          value: function requestResetPassword(userName, $event) {
            $event.preventDefault();
            $api.users.requestReset(userName).then(function(data){
              requestResetPasswordModal = false;
            }, function(msg){
              authErrorMessage = "Error submitting reset request.";
            });
          }
        },

        showRequestResetPasswordModal: {
          enumerable: true,
          value: function showRequestResetPasswordModal($event) {
            $event.preventDefault();
            requestResetPasswordModal = true;
          }
        },

        cancelRequestResetPasswordModal: {
          enumerable: true,
          value: function cancelRequestResetPasswordModal($event) {
            $event.preventDefault();
            requestResetPasswordModal = false;
          }
        },

        resetPasswordModal: {
          enumerable: true,
          get: function getResetPasswordModal() {
            return _.toBoolean(resetPasswordModal);
          }
        },

        getLinks: {
          enumerable: true,
          value: function getLinks(parent) {
            return $nav.links[parent]?$nav.links[parent].children:[];
          }
        },

        authErrorMessage: {
          enumerable: true,
          get: function getErrorMessage() {
            return authErrorMessage;
          }
        },
        
        confirmedPassword: {
          enumerable: true,
          get: function getConfirmedPassword() {
            return confirmedPassword;
          },
          set: function setConfirmedPassword(value) {
            confirmedPassword = value;
          }
        },
        
        newPassword: {
          enumerable: true,
          get: function getNewPassword() {
            return newPassword;
          },
          set: function setNewPassword(value) {
            newPassword = value;
          }
        },        
        
        cancelResetpasswordModal: {
          enumerable: true,
          value: function cancelResetpasswordModal($event) {
            $event.preventDefault();
            resetPasswordModal = false;
          }
        },

        featureEnabled:{
          enumerable: true,
          value: function(feature){
            if (feature == 'custom_reporting')
              return $config.features.customReports;
            
            return true;
          }
        },

        hideChrome: {
	  enumerable: true,
	  get: function getHideChrome() {
	    return hideChrome;
	  }
        },        

        helpEnabled: {
	  enumerable: true,
	  get: function getHelpEnabled() {
	    return helpEnabled;
	  },
	  set: function setHelpEnabled(value) {
	    helpEnabled = value;
	  }
        },        
        
        
        helpTopics: {
	  enumerable: true,
	  get: function getHelpTopics() {
	    return $help.topics();
	  }
        },        
        
        toggleHelpEnabled: {
	  enumerable: true,
	  value: function toggleHelpEnabled($event) {
	    $event.preventDefault();
	    helpEnabled = !helpEnabled;
	  }
        },

        showHelp: {
	  enumerable: true,
	  value: function showHelp(key, $event, placement) {
            var el = $event.target,
              topics = this.helpTopics;

            var help = {
              content: topics[key].content,
              placement: placement || 'right',
              container: 'body',
              template: '<div style="min-width: 35%;" class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            };
            
            if (topics[key].title)
              help.title = topics[key].title;
            
            $(el).popover(help);
            $(el).popover('show');
          }
        },

        hideHelp: {
	  enumerable: true,
	  value: function hideHelp(key, $event) {
            var el = $event.target;
            $(el).popover('destroy');
	  }
        }
      });
    }]);
}) (window.angular, window.novantas);