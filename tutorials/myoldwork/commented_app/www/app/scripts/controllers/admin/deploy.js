/**
* @class Deploy (Controller):
*     Puts data on scope for ../../views/admin/deploy.html
      Allows admin to copy Set of Reports to Set of Organizations
      Also allows admin to Clean Database
*/
(function (angular, app, _, $) {
  'use strict';

  app.controller('AdminDeployCtrl',  ['$scope', '$log', '$category',
    '$report', '$debug', '$api', '$nav',
    function ($scope, $log, $category, $report, $debug, $api, $nav) {
      var
        allCustomReports = [],
        allStandardReports = [],
        allOrganizations = [],
        selectedCustomReports = [],
        selectedStandardReports = [],
        selectedOrganizations = [],
        showDeployModal,
        // these should be made into directives
        showSuccessModal,
        showErrorModal,
        showCleanReportsModal,
        showCleanSuccessModal,
        showCleanErrorModal
        ;


      $api.organizations.get().then(function loadOrganizations(orgs){
        _(orgs).each(function addOrgsToView (org){
          allOrganizations.push({uri: org.tenantFolderUri, name: org.tenantName});
        });
      });

      $nav.onLoad(function loadReports() {
       _($nav.links).each(function filterLinksForReports(link) {
         if (('data' in link) &&
           ('jasperUri' in link.data) &&
           (link.data.jasperUri).match(/report/i)) {
            if ((link.data.jasperUri).match(/\/Stock\//)) {
              allStandardReports.push({name: link.data.name, uri: link.data.jasperUri});
            }
           else if ((link.data.jasperUri).match(/\/Custom\//)) {
              allCustomReports.push({name: link.data.name, uri: link.data.jasperUri});
            }
           else {
              $log.error('Report found that is neither Stock nor Custom: ', link);
            }
         }
       });
      });

      Object.defineProperties($scope, {
      categoryLink: {
        enumerable: true,
        get: function getCategoryLink() {
          return  $nav.links.admin;
        }
    },

      allStandardReports: {
          enumerable: true,
          get: function getAllStandardReports() {
            return  allStandardReports;
          }
        },

        allCustomReports: {
          enumerable: true,
          get: function getAllCustomReports() {
            return  allCustomReports;
          }
        },

        allOrganizations : {
          enumerable: true,
          get: function getAllOrganizations() {
            return  allOrganizations;
          }
        },

        selectedStandardReports: {
          enumerable: true,
          get: function getSelectedStandardReports() {
            return selectedStandardReports;
          },
          set: function setSelectedStandardReports(value) {
            selectedStandardReports = value;
          }
        },

        selectedCustomReports: {
          enumerable: true,
          get: function getSelectedCustomReports() {
            return selectedCustomReports;
          },
          set: function setSelectedStandardReports(value) {
            selectedCustomReports = value;
          }
        },

        selectedOrganizations: {
          enumerable: true,
          get: function getSelectedOrganizations() {
            return selectedOrganizations;
          },
          set: function setSelectedOrganizations(value) {
            selectedOrganizations = value;
          }
        },

        resetSelectors: {
          enumerable: true,
          value: function resetSelectors($event) {
            $event.preventDefault();
            selectedOrganizations = [];
            selectedCustomReports = [];
            selectedStandardReports = [];
          }
        },

        selectionsInvalid: {
          enumerable: true,
          value: function selectionsInvalid() {
            return ((_.union(selectedCustomReports, selectedStandardReports).length) === 0 || 
		    selectedOrganizations.length === 0);
          }
        },

        showCleanReportsModal: {
          enumerable: true,
          get: function getShowDeleteModal() {
            return _.toBoolean(showCleanReportsModal);
          }
        },

        cleanReports: {
          enumerable: true,
          value: function ($event) {
            $event.preventDefault();
            showCleanReportsModal = false;

            $api.reports.clean()
              .then(function cleanSuccess(){
                $log.debug("cleaning success");
                showCleanSuccessModal = true;
              },
              function cleanError(data) {
                $log.debug("cleaning success");
                showCleanErrorModal = true;
              } );
          }
        },


        showDeployModal: {
          enumerable: true,
          get: function getShowDeleteModal() {
            return _.toBoolean(showDeployModal);
          }
        },


        showSuccessModal: {
          enumerable: true,
          get: function getShowSuccessModal() {
            return _.toBoolean(showSuccessModal);
          }
        },

        showErrorModal: {
          enumerable: true,
          get: function getShowErrorModal() {
            return _.toBoolean(showErrorModal);
          }
        },

        showCleanSuccessModal: {
          enumerable: true,
          get: function getShowSuccessModal() {
            return _.toBoolean(showCleanSuccessModal);
          }
        },

        showCleanErrorModal: {
          enumerable: true,
          get: function getShowErrorModal() {
            return _.toBoolean(showCleanErrorModal);
          }
        },


        showDeploy: {
          enumerable: true,
          value: function showDeploy($event) {
            $event.preventDefault();
            showDeployModal = true;
          }
        },

        showCleanReports: {
          enumerable: true,
          value: function showReportsClean($event) {
            $log.debug("showing clean reports");
            $event.preventDefault();
            showCleanReportsModal = true;
          }
        },


        hideSuccessModal: {
          enumerable: true,
          value: function hideSuccessDialog($event) {
            $event.preventDefault();
            showSuccessModal = false;
          }
        },


        hideErrorModal: {
          enumerable: true,
          value: function hideErrorDialog($event) {
            $event.preventDefault();
            showErrorModal = false;
          }
        },

        hideCleanSuccessModal: {
          enumerable: true,
          value: function hideSuccessDialog($event) {
            $event.preventDefault();
            showCleanSuccessModal = false;
          }
        },


        hideCleanErrorModal: {
          enumerable: true,
          value: function hideErrorDialog($event) {
            $event.preventDefault();
            showCleanErrorModal = false;
          }
        },

        deploy: {
          enumerable: true,
          value: function ($event) {
            $event.preventDefault();
            showDeployModal = false;

            $api.reports.deployReports(
              _.pluck(_.union(selectedCustomReports, selectedStandardReports), 'uri'),
                _.pluck(selectedOrganizations, 'uri'))
              .then(function deploySuccess(){
                showSuccessModal = true;
              },
              function deployError(data) {
                showErrorModal = true;
              } );
          }
        },

        cancelDeploy: {
          enumerable: true,
          value: function cancelDeploy($event) {
            $event.preventDefault();
            showDeployModal = false;
          }
        },

        cancelCleanReports: {
          enumerable: true,
          value: function cancelDeploy($event) {
            $event.preventDefault();
            showCleanReportsModal = false;
          }
        }


      });
    }]);

}) (window.angular, window.novantas, window._, window.jQuery);
