(function (angular, app, _) {

  'use strict';

  app.factory('$report', ['$log', '$debug', '$api', '$user', '$q',
    function ($log, $debug, $api, $user, $q) {

      var reportFactory,
          reports = {},
          afterLoadEventKey = '$report.afterLoad',
          initialize = function $reportInitialize(state) {
            reports = {};

            // reports
            _.each(state.reports, function (data, id) {
              reports[id] = new Report(data);
            });

            _.trigger(afterLoadEventKey, reportFactory);

            $log.debug('$report Initialized', reports);
            return reportFactory;
          },
          memoizedLoadControls = _.memoize(function memoizedLoadControls(reportUri) {
            return $api.jasper.inputs(reportUri);
          }),
          memoizedLoadTable = _.memoize(function memoizedLoadTable(reportUri, parameters) {
            $log.debug('Table not memoized, loading from API', reportUri, parameters);
            return $api.jasper.data(reportUri, parameters);
          }, function (reportUri, parameters) {
            return JSON.stringify({ uri: reportUri, parameters: parameters });
          }),
          memoizedLoadReport = _.memoize(function memoizedLoadReport(reportUri) {
            return $api.jasper.report(reportUri).then(function (jasperData) {
              return jasperData;
            }, function (error) {
              $log.error('Unable to load report, status: ' + error.status);
              return error;
            });
          }),
          getTemplateIds = function(){
            return _(reports).reduce(
              function(sofar, value){
                if (value.isTemplate)
                  sofar.push(value.id);

                return sofar;
              }, []);
          },
          loadReport = function loadReport(reportId) {
            var report = reports[reportId];

            if (!report) {
              $log.error('Invalid reportId:', reportId, reports);
              return $q.reject('Invalid reportId: ' + reportId);
            }

            return memoizedLoadReport(report.uri).then(function (jasperData) {
              report.data = _.extend(report.data, jasperData);
              return report;
            });
          };

      function Report(data) {
        var self = this;
        self.data = data || {};
        self.state = {};
      }

      Report.prototype = Object.create(Object.prototype, {

        id: {
          enumerable: true,
          get: function getId() {
            var self = this;
            return self.data.id;
          }
        },

        uri: {
          enumerable: true,
          get: function getUri() {
            var self = this;
            return self.data.jasperUri;
          }
        },

        viewUri: {
          enumerable: true,
          get: function getViewUri() {
            var self = this;
            return self.data.dataSource.dataSourceReference.uri;
          }
        },

        label: {
          enumerable: true,
          get: function getLabel() {
            var self = this;
            return self.data.label;
          }
        },

        description: {
          enumerable: true,
          get: function getDescription() {
            var self = this;
            return self.data.description;
          }
        },

        advisor: {
          enumerable: true,
          get: function getAdvisor() {
            var self = this;
            return self.data.data.advisor;
          }
        },

        custom: {
          enumerable: true,
          get: function getCustom() {
            var self = this;
            return self.data.customView;
          }
        },

        table: {
          enumerable: true,
          value: function loadTable(parameters) {
            var self = this;
            return memoizedLoadTable(self.uri, parameters);
          }
        },

        controls: {
          enumerable: true,
          value: function loadControls() {
            var self = this;
            return memoizedLoadControls(self.uri);
          }
        },

        widgets: {
          enumerable: true,
          get: function getWidgets() {
            var self = this;
            return self.data.widgets;
          }
        },

        filters: {
          enumerable: true,
          get: function getFilters() {
            var self = this;
            return self.data.filters;
          }
        },

        isTemplate: {
          enumerable: true,
          get: function isTemplate() {
            var self = this;
            return self.data.isTemplate;
          }
        },

        $copy: {
          enumerable: true,
          value: function $copyReport(label) {
            var self = this;
            return $api.reports.copy(self.id, label).then(function $copyReportResponse(data) {
              $log.debug('Report Copied', data);
              var newReport = new Report(data);
              reports[newReport.id] = newReport;
              $log.debug('New Report', newReport);
              return newReport;
            });
          }
        },

        $delete: {
          enumerable: true,
          value: function $deleteReport() {
            var self = this;
            return $api.reports.delete(self.id).then(function $deleteReportResponse() {
              $log.debug('Report Deleted', self.data);
              delete reports[self.id];
            });
          }
        }

      });

      $api.onLogin(initialize);
      $api.onLogout(function $reportLogoutHandler() {
        reports = {};
      });

      reportFactory = Object.create(Object.prototype, {
        onLoad: {
          enumerable: true,
          value: function onLoad(handler) {
            var self = this;

            _.on(afterLoadEventKey, handler);

            if (!_.isEmpty(reports)) {
              $log.debug('Already loaded, triggering handler');
              handler(self);
            }
          }
        },

        get: {
          enumerable: true,
          value: function getReport(reportId) {
            return loadReport(reportId);
          }
        },
        
        templates: {
          enumerable: true,
          value: function(){
            return getTemplateIds();
          }
        }
      });

      $debug.services.$report = reportFactory;
      return reportFactory;
    }]);

})(window.angular, window.novantas, window._);

