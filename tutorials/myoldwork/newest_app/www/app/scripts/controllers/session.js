(function (angular, app) {
  'use strict';
  app.controller('SessionCtrl', ['$scope', '$log', '$routeParams', '$api', '$location', '$config', '$sce', 
    function ($scope, $log, $routeParams, $api, $location, $config, $sce) {
      var notifications = {},
          confirmedPassword,
          showError,
          errorMessage,
      	  resetPasswordModal;
       

      Object.defineProperties($scope, {
        notifications: {
          enumerable: true,
          get: function getNotifications() {
            return notifications;
          }
        },

        showNotification: {
          enumerable: true,
          value: function showNotification(key, notification) {
            $log.debug('Showing notification', key, notification);
            notifications[key] = notification;
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
          value: function login(credential, $event) {
            $event.preventDefault();

            credential = credential;
            $log.debug("credential:",credential);
            showError = false;
    		errorMessage = "";
            
            var self = this,
                returnTo = $routeParams.returnTo || '/',
                username = credential.username,
                password = credential.password,
                organization = credential.organization;
            
            $log.debug("user:",username,"new pass: ",password);
            if (resetPasswordModal)  {
            	if (angular.isUndefined(password) || password === null) {
            		showError = true;
            		errorMessage = "Password is required!";
            		return;            		
            	}
            	if (confirmedPassword!=password)  {
            		showError = true;
            		errorMessage = "Password does not match!";
            		return;
            	}
            	username = username+"|Reset";
            }

            $api.$login(username, password, organization).then(function () {
            	
              resetPasswordModal = false;
              self.hideNotification('auth');
              $log.debug('Return To', returnTo);
              $location.search('returnTo', null).path(returnTo || '/');
            }, 
            function (reason) {
              $log.debug('Authentication error, reason:', reason.data);
              if (reason.data=='CP' || reason.data=='BK')  {
            	  resetPasswordModal = true;
              }
              else if (reason.data=='CO')  {
            	showError = true;
          		errorMessage = "Password does not meet requirement! (e.g. At least one capital letter and two digits)";
          		return;
              }
              else {
            	self.showNotification('auth', { type: 'danger', message: $sce.trustAsHtml('<strong>Authentication error!</strong> Bad credentials, please try again') });
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

        resetPasswordModal: {
            enumerable: true,
            get: function getResetPasswordModal() {
              return _.toBoolean(resetPasswordModal);
            }
        },
        
        showError: {
            enumerable: true,
            get: function getShowError() {
              return _.toBoolean(showError);
            }
        },
        
        errorMessage: {
            enumerable: true,
            get: function getErrorMessage() {
              return errorMessage;
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
        }
        
        
      });
    }]);
}) (window.angular, window.novantas);