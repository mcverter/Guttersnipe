(function (angular, app, _) {
  'use strict';
  app.controller('AdminMetadataCtrl', ['$scope', '$log', '$location', '$api', '$sce', '$nav', '$report',

    function ($scope, $log, $location, $api, $sce, $nav, $report) {
      var
        novaLinks,
        novaReports,

        levels = {},
        categories = [],
        categorizedHierarchy = [],
        uncategorizedReports = [],
        selectedReport = 0,
        selectedCategory = 0,
        customReportPrefix = "/Reports/Custom",
        showAddCategories = false,
        showEditJSON = false,
        showChangeNameDescription = false,
        showRemoveFromCategory = false,

        showNewCategory = false,
        showDeleteCategory = false,
        showEditCategory = false,

        selectedReportParent = null,
        selectedReportNonCategories = [],
        addedCategories = [],
        reportName = null,
        reportDescription = null,
        reportMetadata = null;

      function UncategorizedReport (name, description, uri, id) {
        this.name = name;
        this.description = description;
        this.uri = uri;
        this.id = id;
      }

      function CategorizedReport (name, id, description, uri, level, parentPath, childrenArray, metadata) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.uri = uri;
        this.level = level;
        this.parentPath = parentPath;
        this.metadata = metadata;
      }

      function Category (name, level, path, hierarchicalPath, parents) {
        this.name = name;
        this.level = level;
        this.path = path;
        this.hierarchicalPath = hierarchicalPath;
        this.parents = parents;
      }

      function makeUncategorizedReports() {
        /* get uncategorized reports */
        $api.jasper.allReports().then(function(data2) {
          var categorizedReportUris = _.pluck(categorizedHierarchy, 'uri');
          var novaReportData = _.pluck(novaReports, 'data');

          _.each(data2, function addToUncategorized(element) {
            if ((element.uri.indexOf(customReportPrefix) !== 0) &&
              (!_.contains(categorizedReportUris, element.uri))) {
              console.log("uncategorical uri ", element.uri);
              var matchingNova = _.findWhere(novaReportData, {jasperUri: element.uri});
              if (matchingNova) {
                uncategorizedReports.push(new UncategorizedReport(element.label, element.description, element.uri, matchingNova.id));
              }
              else {
                uncategorizedReports.push(new UncategorizedReport(element.label, element.description, element.uri));
              }
            }
          });
        });
      }

      $report.onLoad(function() {
        novaReports = $report.all;
        if (novaLinks && novaReports) {
          buildLinks();
          makeUncategorizedReports();
        }
      });

      $nav.onLoad(function(){
        novaLinks = $nav.rawNav;
        if (novaLinks && novaReports) {
          buildLinks();
          makeUncategorizedReports();
        }
      });

      /* returns full hierarchical path of a link */
      function hierarchicalPath(link){
        if (link.parents.length == 0) {
          return link.name;
        }
        else {
          var parent_link = _.findWhere(categories, {path: link.parents[0]});
          return hierarchicalPath(parent_link)  + " >>> " +   link.name;
        }
      }

      /* gets categories && categorizedReports */
      function buildLinks(){
        categories = [];
        categorizedHierarchy = [];
        uncategorizedReports = [];

        var nav = novaLinks;
        var reports = novaReports;
        $log.debug("Top Links", nav.top);
        _.each(_.without(nav.top,"./" , "analytics/custom"), function(top){
          $log.debug("this is a top: ", top);
          addLink(top, 0);
        });

        $scope.levels = _.keys(levels).map(function(el){
          return parseInt(el);
        });
        $scope.selectedLevel = Math.min(1, $scope.levels.length - 1);

        function addLink(link, level){
          if (!nav.links[link]) {
            return;
          }

          levels[level] = true;
          var rptLink = nav.links[link];

          /* reports */
          if ((rptLink.jasperUri) && (rptLink.jasperUri.indexOf(customReportPrefix) !== 0)) {
            $log.debug("RptLink ", rptLink);
            var rptReport = _.findWhere(reports, {uri: rptLink.jasperUri});
            if (! rptReport) {
              rptReport = _.findWhere(reports, {uri: rptLink.path});

              // need to track this down
              if (!rptReport) {
                $log.error("Could not find a report corresponding to link ", rptLink);
              }
            }
            var addedMetadata = _.omit(rptReport.data, 'id', 'jasperUri');
            var report = new CategorizedReport(rptLink.name, rptReport.data.id, rptLink.description, rptLink.jasperUri, level, rptLink.parents[0], rptLink.children, addedMetadata);
            categorizedHierarchy.push(report);
          }
          /* categories */
          else {
            var hierPath = hierarchicalPath(rptLink);
            var category = new Category(rptLink.name, level,  rptLink.path, hierPath, rptLink.parents);
            categorizedHierarchy.push(category);
            categories.push(category);

          }
          _.each(nav.links[link].children, function(child){
            addLink(child, level + 1);
          });
        }
      }

      Object.defineProperties($scope, {
        reportName: {
          enumerable: true,
          get: function getReportName() {
            return reportName;
          },
          set: function setReportName(value) {
            reportName = value;
          }
        },

        reportDescription: {
          enumerable: true,
          get: function getReportDescription() {
            return reportDescription;
          },
          set: function setReportDescription(value) {
            reportDescription = value;
          }
        },

        reportMetadata: {
          enumerable: true,
          get: function getReportMetadata() {
            return reportMetadata;
          },
          set: function setReportMetadata(value) {
            reportMetadata = value;
          }
        },

        categoryLink: {
          enumerable: true,
          get: function getAllStandardReports() {
            return  $nav.links.admin;
          }
        },

        isReport: {
          enumerable: true,
          value: function isReportNotCategory(rpt) {
            return rpt instanceof CategorizedReport;
          }
        },

        categories: {
          enumerable: true,
          get: function getCategories() {
            return  categories;
          }
        },

        categorizedReports: {
          enumerable: true,
          get: function getCategorizedReports() {
            return  categorizedHierarchy;
          }
        },

        uncategorizedReports: {
          enumerable: true,
          get: function getUncategorizedReports() {
            return  uncategorizedReports;
          }
        },

        selectedReport: {
          enumerable: true,
          get: function getReport() {
            return selectedReport;
          }
        },

        selectedCategory : {
          enumerable: true,
          get: function getCategory() {
            return selectedCategory;
          }
        },

        selectedReportParent: {
          enumerable: true,
          get: function getReportParent() {
            return selectedReportParent;
          }
        },

        selectedReportNonCategories: {
          enumerable: true,
          get: function getCategorizedReport() {
            return selectedReportNonCategories;
          }
        },

        addedCategories: {
          enumerable: true,
          get: function getAddedCategories() {
            return addedCategories;
          },

          set: function setAddedCategories(value) {
            addedCategories = value;
          }
        },

        /* New Category */
        showNewCategory : {
          enumerable: true,
          get: function getShowNewCategory() {
            return _.toBoolean(showNewCategory);
          }
        },
        initiateNewCategory : {

        },

        confirmNewCategory : {
          enumerable: true,
          value: function confirmNewCategory($event, addCategoryForm) {
            $event.preventDefault();
            $api.category.create()
              .then (
              function createSuccess(){
                showNewCategory = false;
              },
              function createFailure(){
              }
            );
            selectedCategory = 0;
          }
        },
        cancelNewCategory : {

        },
        /* Delete Category */
        showDeleteCategory : {
          enumerable: true,
          get: function getShowDeleteCategory() {
            return _.toBoolean(showDeleteCategory);
          }
        },

        initiateDeleteCategory : {

        },

        confirmDeleteCategory : {
          enumerable: true,
          value: function confirmDeleteCategory($event, addCategoryForm) {
            $event.preventDefault();
            $api.category.delete()
              .then (
              function deleteSuccess(){
                showAddCategories = false;
              },
              function deleteFailure(){
                addCategoryForm.$setValidity("addCategoryFail", false);
              }
            );
            selectedCategory = 0;
          }
        },

        cancelDeleteCategory : {

        },
        /* Edit Category */
        showEditCategory : {
          enumerable: true,
          get: function getShowEditCategory() {
            return _.toBoolean(showEditCategory);
          }
        },

        initiateEditCategory : {


        },
        confirmEditCategory : {
          enumerable: true,
          value: function confirmEditCategory($event, addCategoryForm) {
            $event.preventDefault();
            $api.reports.editCategory()
              .then (
              function editSuccess(){
                showEditCategory = false;
              },
              function editFailure(){
              }
            );
            selectedCategory = 0;
          }
        },
        cancelEditCategory : {


        },

        /* Add  Categories */
        showAddCategories: {
          enumerable: true,
          get: function getShowAddCategories() {
            return _.toBoolean(showAddCategories);
          }
        },

        initiateAddCategories: {
          enumerable: true,
          value: function addCategories ($event, report) {
            selectedReport = report;
            if (report.parentPath) {
              selectedReportNonCategories = _.without(categories,
                _.findWhere(categories, {path: report.parentPath}));
            }
            else {
              selectedReportNonCategories = categories;
            }
            showAddCategories = true;
          }
        },

        confirmAddCategories: {
          enumerable: true,
          value: function confirmAddCategories($event, addCategoryForm) {
            $event.preventDefault();
            $api.reports.categorize(selectedReport.uri, selectedReport.name,
                _.pluck(addedCategories, 'path'),
                selectedReport.id)
              .then (
              function categorizeSuccess(){
                showAddCategories = false;
              },
              function categorizeFailure(){
                addCategoryForm.$setValidity("addCategoryFail", false);
              }
            );
            selectedReport = 0;
            addedCategories = [];
          }
        },

        cancelAddCategories: {
          enumerable: true,
          value: function cancelAddCategories($event) {
            showAddCategories = false;
            addedCategories = [];
          }
        },

        /* Remove From Category */
        showRemoveFromCategory: {
          enumerable: true,
          get: function getShowRemoveCategory() {
            return _.toBoolean(showRemoveFromCategory);
          }
        },

        initiateRemoveFromCategory: {
          enumerable: true,
          value: function remove($event, report) {
            selectedReport = report;
            selectedReportParent = _.findWhere(categories, {path: report.parentPath});
            showRemoveFromCategory = true;
          }
        },

        confirmRemoveFromCategory: {
          enumerable: true,
          value: function confirmRemoveCategory($event, removeCategoryForm) {
            $event.preventDefault();
            $api.reports.uncategorize(selectedReport.id, selectedReport.uri, selectedReportParent.path)
              .then (
              function categorizeSuccess(){},
              function categorizeFailure(){
                removeCategoryForm.$setValidity("removeCategoryFail", false);
              }
            );
            selectedReport = 0;
            selectedReportParent = 0;
            showRemoveFromCategory = false;
          }
        },

        cancelRemoveFromCategory: {
          enumerable: true,
          value: function categorizedEditMetadata($event) {
            showRemoveFromCategory = false;
          }
        },

        /* Edit Name and Description */
        showChangeNameDescription: {
          enumerable: true,
          get: function getShowChangeNameDescription() {
            return _.toBoolean(showChangeNameDescription);
          }
        },

        initiateChangeNameDescription: {
          enumerable: true,
          value: function changeNameDescription ($event, report) {
            selectedReport = report;
            reportName = selectedReport.name;
            reportDescription = selectedReport.description;
            $log.debug("In change name ", selectedReport);
            showChangeNameDescription = true;
          }
        },

        confirmChangeNameDescription: {
          enumerable: true,
          value: function confirmChangeNameDescription($event, changeNameDescriptionForm) {
            $event.preventDefault();
            showChangeNameDescription = false;
            $api.reports.update(selectedReport.id, selectedReport.uri, reportName, reportDescription)
              .then (function editSuccessful () {
                selectedReport = 0;
                reportName = null;
                reportDescription = null;
              },
              function editFailure (error) {
                $log.error("error message is" , error);
                changeNameDescriptionForm.$setValidity("changeNameDescriptionFail", false);
                if (error.code === 'label') {
                  changeNameDescriptionForm.reportLabel.$setValidity("invalidLabel", false);
                }
              }
            );
          }
        },

        cancelChangeNameDescription: {
          enumerable: true,
          value: function cancelChangeNameDescription($event) {
            showChangeNameDescription = false;
            selectedReport = null;
            reportName = null;
            reportDescription = null;
          }
        },

        /* Edit JSON*/
        showEditJSON: {
          enumerable: true,
          get: function getShowEditJSON() {
            return _.toBoolean(showEditJSON);
          }
        },

        initiateEditJSON: {
          enumerable: true,
          value: function editJSON ($event, report) {
            selectedReport = report;
            reportMetadata = JSON.stringify(selectedReport.metadata, null, " ");
            showEditJSON = true;
          }
        },

        confirmEditJSON: {
          enumerable: true,
          value: function confirmEditJSON($event, editJSONForm) {
            $event.preventDefault();
            try {
              JSON.parse(reportMetadata);
            }
            catch(e) {
              $log.debug("could not parse metadata");
              editJSONForm.$setValidity("badJSON", false);
              return;
            }
            if (selectedReport.isCustom) {
              reportMetadata.category = 'Custom';
            }
            $api.reports.editJSON(selectedReport.id, selectedReport.uri, reportMetadata)
              .then (
              function editMetadataSuccess(){},
              function editMetadataFailure(){
                editJSONForm.$setValidity("editJSONFail", false);
                return;
              }
            );
            selectedReport = 0;
            reportMetadata = 0;
            showEditJSON = false;
          }
        },

        cancelEditJSON: {
          enumerable: true,
          value: function cancelEditJSON($event) {
            selectedReport = 0;
            reportMetadata = 0;
            showEditJSON = false;
          }
        }
      });
    }]);
})(window.angular, window.novantas, window._, window.jQuery);

