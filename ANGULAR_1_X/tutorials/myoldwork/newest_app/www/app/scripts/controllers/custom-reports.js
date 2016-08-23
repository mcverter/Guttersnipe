(function (angular, app, _, $) {
  'use strict';

  app.controller('CustomReportsCtrl', ['$scope', '$log', '$category', '$report', '$debug', '$sce', '$location',
      function ($scope, $log, $category, $report, $debug, $sce, $location) {
        var activeFilter,
          filteredCategoryLink,
          filterChildren = function filterChildren(link, filter) {
            var children = _.clone(link.children);
            Object.defineProperty(link, 'children', {
              enumerable: true,
              get: _.memoize(_.partial(doFilterChidren, children, filter))
            });
          },
          doFilterChidren = function doFilterChildren(children, filter) {
            filter = filter.toLowerCase();

            return _.reduce(children, function (acc, child) {
              var name = (child.name || '').toLowerCase(),
                  description = (child.description || '').toLowerCase();

              if (name.indexOf(filter) !== -1 || description.indexOf(filter) !== -1) {
                // if search if found in current link, show all children.  That way you can search for sub categories.
                acc.push(child);
              } else {
                filterChildren(child, filter);
                if (!_.isEmpty(child.children)) {
                  acc.push(child);
                }
              }

              return acc;
            }, []);
          },
          selectedLink,
          selectedReport,
          setSelected = function setSelected(link) {
            var reportId = link.data.reportId;

            selectedLink = link;
            $report.get(reportId).then(function setSelectedReport(r) {
              selectedReport = r;
              reportLabel = r.label;
              reportDescription = r.description;
            });
          },
          showDeleteModal,
          showCreateModal,
          showEditDetailsModal,
          reportLabel,
          reportDescription,
          templateIds = [],
          templates = [];

        $report.onLoad(function loadTemplates() {
          templateIds = $report.templates();
          _(templateIds).each(function loadTemplate(templateId) {
            $report.get(templateId).then(function templateLoaded(template) {
              templates.push(template);
              $scope.selectedTemplate = _.first(templates);
            });
          });
        });

        Object.defineProperties($scope, {
          currentCategoryLink: {
            enumerable: true,
            get: function getcurrentCategoryLink() {
              return filteredCategoryLink ||  $category.link('Custom');
            }
          },

          filter: {
            enumerable: true,
            value: function filter(query) {
              if (!query || query.length <= 0) {
                // clear query
                activeFilter = null;
                filteredCategoryLink = null;
              } else {
                activeFilter = query;
                filteredCategoryLink =  $category.link('Custom').clone();
                filterChildren(filteredCategoryLink, activeFilter);
              }
            }
          },

          highlight: {
            enumerable: true,
            value: function highlight(value) {
              if (!activeFilter) {
                return $sce.trustAsHtml(value);
              }

              if (!value) {
                return value;
              }

              var filterLower = activeFilter.toLowerCase(),
                  filterLength = filterLower.length,
                  doHighlight = function doHighlight(rest) {

                    var restLower = rest.toLowerCase(),
                        startIndex = restLower.indexOf(filterLower),
                        prefix,
                        emphasis;

                    if (startIndex === -1) {
                      return rest;
                    }

                    prefix = rest.substring(0, startIndex);
                    emphasis = rest.substring(startIndex, startIndex + filterLength);
                    rest = rest.substring(startIndex + filterLength);

                    return prefix + '<strong class="highlight">' + emphasis + '</strong>' + doHighlight(rest);
                  };

              return $sce.trustAsHtml(doHighlight(value));
            }
          },

          selectedReport: {
            enumerable: true,
            get: function getSelectedReport() {
              return selectedReport;
            }
          },

          reportLabel: {
            enumerable: true,
            get: function getReportLabel() {
              return reportLabel;
            },
            set: function setReportLabel(value) {
              reportLabel = value;
            }
          },

          reportDescription: {
            enumerable: true,
            get: function getReportDescription() {
              return reportDescription;
            },
            set: function setReprotDescription(value) {
              reportDescription = value;
            }
          },

          showDeleteModal: {
            enumerable: true,
            get: function getShowDeleteModal() {
              return _.toBoolean(showDeleteModal);
            }
          },

          showDelete: {
            enumerable: true,
            value: function showDelete($event, reportLink) {
              $event.preventDefault();
              showDeleteModal = true;
              setSelected(reportLink);
            }
          },

          delete: {
            enumerable: true,
            value: function ($event) {
              $event.preventDefault();
              showDeleteModal = false;
              selectedReport.$delete();
            }
          },

          cancelDelete: {
            enumerable: true,
            value: function cancelDelete($event) {
              $event.preventDefault();
              showDeleteModal = false;
            }
          },

          templates: {
            enumerable: true,
            get: function getTemplates() {
              return templates;
            }
          },

          showCreateModal: {
            enumerable: true,
            get: function getShowCreateModal() {
              return _.toBoolean(showCreateModal);
            }
          },

          showCreate: {
            enumerable: true,
            value: function showCreate($event, reportLink) {
              $event.preventDefault();
              showCreateModal = true;
              reportLabel = null;
              reportDescription = null;
            }
          },

          create: {
            enumerable: true,
            value: function create($event, label, description, template) {
              $event.preventDefault();
              showCreateModal = false;
              $report.get(template.id).then(function getTemplate(r) {
                r.$copy(label).then(function copyTemplate(newReport) {
                  $location.path('/analytics/custom/adhoc/' + newReport.id);
                });
              });
            }
          },

          cancelCreate: {
            enumerable: true,
            value: function cancelCreate($event) {
              $event.preventDefault();
              showCreateModal = false;
            }
          },

          showEditDetailsModal: {
            enumerable: true,
            get: function getShowEditDetailsModal() {
              return _.toBoolean(showEditDetailsModal);
            }
          },

          showEditDetails: {
            enumerable: true,
            value: function showEditDetails($event, reportLink) {
              $event.preventDefault();
              showEditDetailsModal = true;
              setSelected(reportLink);
            }
          },

          editDetails: {
            enumerable: true,
            value: function editDetails($event) {
              $event.preventDefault();
            }
          },

          cancelEditDetails: {
            enumerable: true,
            value: function cancelEditDetails($event) {
              $event.preventDefault();
              showEditDetailsModal = false;
            }
          },

          edit: {
            enumerable: true,
            value: function edit($event, reportLink) {
              $event.preventDefault();
              $location.path('/analytics/custom/adhoc/' + reportLink.data.reportId);
            }
          }
        });

      }]);

}) (window.angular, window.novantas, window._, window.jQuery);