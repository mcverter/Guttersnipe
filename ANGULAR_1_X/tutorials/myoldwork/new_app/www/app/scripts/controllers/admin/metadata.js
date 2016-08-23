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
        selectedReport = null,
        selectedCategory = null,
        customReportPrefix = "/Reports/Custom",
        showAddCategories = false,
        showEditJSON = false,
        showChangeNameDescription = false,
        showRemoveFromCategory = false,

        showNewCategory = false,
        showDeleteCategory = false,
        showRenameCategory = false,

        selectedReportParent = null,
        selectedReportNonCategories = [],
        addedCategories = [],
        reportName = null,
        reportDescription = null,
        reportMetadata = null,
        categoryName = null,
        newCategoryTitle = null;


      function UncategorizedReport (name, description, uri, id) {
        this.name = name;
        this.description = description;
        this.uri = uri;
        this.id = id;
      }

      function CategorizedReport (name, id, description, uri, level, parentPath, metadata) {
        this.name = name;
        this.id = id;
        this.description = description;
        this.uri = uri;
        this.level = level;
        this.parentPath = parentPath;
        this.metadata = metadata;
      }

      function Category (name, level, path, hierarchicalPath, parents, numChildren) {
        this.name = name;
        this.level = level;
        this.path = path;
        this.hierarchicalPath = hierarchicalPath;
        this.parents = parents;
        this.numChildren = numChildren;
      }

      function makeUncategorizedReports() {
        /* get uncategorized reports */
        $api.jasper.allReports().then(function(data2) {
          var categorizedReportUris = _.pluck(categorizedHierarchy, 'uri');
          var novaReportData = _.pluck(novaReports, 'data');

          _.each(data2, function addToUncategorized(element) {
            if ((element.uri.indexOf(customReportPrefix) !== 0) &&
              (!_.contains(categorizedReportUris, element.uri))) {
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

        // Neither Dashboard nor Custom Reports are categories
        _.each(_.without(nav.top,"home" , "analytics/custom"), function(top){
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
          if (rptLink.jasperUri)  {
            if (rptLink.jasperUri.indexOf(customReportPrefix) !== 0){
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
          }
          /* categories */
          else {
            var hierPath = hierarchicalPath(rptLink);
            $log.debug("Category link", rptLink);
            var category = new Category(rptLink.name, level,  rptLink.path, hierPath, rptLink.parents, rptLink.children.length);
            categorizedHierarchy.push(category);
            categories.push(category);
          }
          _.each(nav.links[link].children, function(child){
            addLink(child, level + 1);
          });
        }
      }

      Object.defineProperties($scope, {
        categoryName: {
          enumerable: true,
          get: function () {
            return categoryName;
          },
          set: function setReportName(value) {
            categoryName = value;
          }
        },

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

        newCategoryTitle: {
          enumerable: true,
          get: function getReportDescription() {
            return newCategoryTitle;
          }
        },

        isCategoryEmpty: {
          enumerable: true,
          value: function (cat) {
            return cat.numChildren === 0;
          }
        },

        isTopLevel: {
          enumerable: true,
          value: function (cat) {
            return cat.level === 0;
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
          enumerable: true,
          value: function ($event, category) {
            $event.preventDefault();
            selectedCategory = category;
            if (category) {
              newCategoryTitle = "Add new subcategory of " + category.hierarchicalPath
            }
            else {
              newCategoryTitle = "Add new top-level category ";
            }
            $log.debug("newwwwww category ", category);
            showNewCategory = true;
          }
        },

        confirmNewCategory : {
          enumerable: true,
          value: function confirmNewCategory() {
            showNewCategory = false;
            $log.debug("selected category", selectedCategory);
            $log.debug("New name", categoryName);

            $api.categories.create(selectedCategory.path, categoryName)
              .then (
              function createSuccess(){
                showNewCategory = false;
              },
              function createFailure(){
              }
            );
            selectedCategory = null;
          }
        },

        cancelNewCategory : {
          enumerable: true,
          value: function() {
            showNewCategory = false;
            selectedCategory = null;
          }
        },
        /* Delete Category */
        showDeleteCategory : {
          enumerable: true,
          get: function getShowDeleteCategory() {
            return _.toBoolean(showDeleteCategory);
          }
        },

        initiateDeleteCategory : {
          enumerable: true,
          value: function ($event, category) {
            $event.preventDefault();
            $log.debug("Deleteing category", category);
            selectedCategory = category;
            showDeleteCategory = true;
          }
        },

        confirmDeleteCategory : {
          enumerable: true,
          value: function confirmDeleteCategory($event, deleteCategoryForm) {
            $event.preventDefault();

            $api.categories.delete(selectedCategory.path)
              .then (
              function deleteSuccess(){
              },
              function deleteFailure(){
                deleteCategoryForm.$setValidity("addCategoryFail", false);
              }
            );
            showDeleteCategory = false;
            selectedCategory = null;
            categoryName = null;
          }
        },

        cancelDeleteCategory : {
          enumerable: true,
          value: function() {
            showDeleteCategory = false;
            selectedCategory = null;
            categoryName = null;
          }
        },
        /* Rename Category */
        showRenameCategory : {
          enumerable: true,
          get: function getShowRenameCategory() {
            return _.toBoolean(showRenameCategory);
          }
        },

        initiateRenameCategory : {
          enumerable: true,
          value: function ($event, category) {
            $event.preventDefault();
            selectedCategory = category;
            categoryName = category.name;
            showRenameCategory = true;
          }
        },
        confirmRenameCategory : {
          enumerable: true,
          value: function confirmRenameCategory() {
            $log.debug("confirming rename category");
            $api.categories.rename(selectedCategory.path, categoryName)
              .then (
              function RenameSuccess(){
              },
              function RenameFailure(){
              }
            );
            showRenameCategory = false;
            selectedCategory = null;
            categoryName = null;
          }
        },
        cancelRenameCategory : {
          enumerable: true,
          value: function() {
            showRenameCategory = false;
            selectedCategory = null;
            categoryName = null;
          }
        },

        /* Add  Categories to Reports */
        showAddCategories: {
          enumerable: true,
          get: function getShowAddCategories() {
            return _.toBoolean(showAddCategories);
          }
        },

        initiateAddCategories: {
          enumerable: true,
          value: function addCategories ($event, report) {
            $event.preventDefault();
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
            selectedReport = null;
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
            selectedReport = null;
            selectedReportParent = null;
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
                selectedReport = null;
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
            selectedReport = null;
            reportMetadata = null;
            showEditJSON = false;
          }
        },

        cancelEditJSON: {
          enumerable: true,
          value: function cancelEditJSON($event) {
            selectedReport = null;
            reportMetadata = null;
            showEditJSON = false;
          }
        }
      });
    }]);
})(window.angular, window.novantas, window._, window.jQuery);

