(function (angular, app, _, URI) {

  'use strict';

  app.controller('ReportCtrl', ['$scope', '$log', '$report', '$routeParams', '$favorite', '$viewingHistory', '$location', '$config', '$googleVisualization',
    function ($scope, $log, $report, $routeParams, $favorite, $viewingHistory, $location, $config, $googleVisualization) {
      var categoryId = $routeParams.categoryId,
          favorite,
          reportId = $routeParams.reportId,
          linkUri = URI($location.path().substring(1)),
          parameters,
          exportParameters,
          reportFactory,
          report,
          reportTitle,
          controls,
          forceUpdate = false,
          table,
          viewMode = 'chart',
          panelOpen = false,
          showCopyReportModal = false,
          filterApplied = false,
          isReady = false,
          exportTypes = ['PDF', 'CSV', 'XLSX', 'DOCX'],

          updateTable = function updateTable(parameters) {
            forceUpdate = false;
            report.table(parameters).then(function (t) {
              $googleVisualization.then(function (vis) {
                table = new vis.DataTable(t);
              });
            });
          },
          updateExportParameters = function(parameters){
            var ps = [],
                p,
                values,
                v;

            for (p in parameters){
              values = parameters[p];
              if (_.isArray(values)) {
                for (v in values) {
                  ps.push(p + '=' + values[v]);
                }
              } else {
                ps.push(p + '=' + values);
              }
            }

            exportParameters = ps.length ? '?' + ps.join('&') : '';
          },
          resetControl = function resetControl(control) {
            if (!_(control.state.value).isNull()) {
              control.value = getFilterValue(control.state.value, control.type);
            } else if (control.state.options) {
              control.value = [];
              _.each(control.state.options, function (op) {
                if (op.selected)
                  control.value.push(op.value);
              });
            }
          };

      // when the report service loads the user's reports then retrieve the currently selected report
      $report.onLoad(function () {
        $report.get(reportId).then(function (r) {
          $log.debug('ReportCtrl, Loaded Report', r);
          report = r;
          
          report.controls().then(function (c) {
            $log.debug('ReportCtrl, Loaded Controls', c);

            //need to apply default values
            _.each(c, function (item) {
              if (_(item.value).isUndefined())
                resetControl(item);
            });

            controls = c;
            
            panelOpen = _.toBoolean(_.maybe(controls, 'length') || _.maybe(report, 'widgets.length'));
            
            //then apply the filter so table gets loaded
            forceUpdate = true;
            $scope.updateParameters();
            
            if (!panelOpen)
              filterApplied = true;
              
            isReady = true;
          });

          $scope.exportPath = $config.jasper.host + 'rest_v2/reports' + report.uri;
        }, function (error) {
          $log.error('Unable to load report,', error);
        });
      });

      $favorite.onLoad(function () {
        favorite = $favorite.find(linkUri);
      });

      $viewingHistory.onLoad(_.once(function () {
        $viewingHistory.$push({ path: linkUri.toString() });
      }));
      
      // setup scope
      Object.defineProperties($scope, {
        categoryId: {
          enumerable: true,
          get: function getCategoryId() {
            return categoryId;
          }
        },

        report: {
          enumerable: true,
          get: function getReport() {
            return report;
          }
        },

        isReady: {
          enumerable: true,
          get: function getIsReady() {
            return isReady;
          }
        },

        title: {
          enumerable: true,
          get: function getTitle(){
            return reportTitle || report.label;
          },
          set: function setTitle(val){
            reportTitle = val;
          }
        },
        
        parameters: {
          enumerable: true,
          get: function getParameters() {
            return parameters;
          }
        },

        exportParameters: {
          enumerable: true,
          get: function getExportParameters() {
            return exportParameters;
          }
        },

        table: {
          enumerable: true,
          get: function getTable() {
            return table;
          },
          set: function setTable(value){
            table = value;
          }
        },

        viewMode: {
          enumerable: true,
          get: function getViewMode() {
            return viewMode;
          },
          set: function setViewMode(value) {
            viewMode = value;
          }
        },

        viewInclude: {
          enumerable: true,
          get: function getViewInclude() {
            var self = this;

            if (!filterApplied)
              return 'views/report-views/empty_report.html';
            else if (self.viewMode === 'table') {
              return 'views/report-views/google-table.html';
            } else if (self.viewMode === 'chart') {
              if (_.maybe(self, 'report.custom'))
                return self.report.custom.view;
              else
                return 'views/report-views/jasper-embed.html';
            }
          }
        },

        exports: {
          enumerable: true,
          get: function getExports() {
            return exportTypes;
          }
        },

        isFavorite: {
          enumerable: true,
          get: function isFavorite() {
            return _.toBoolean(favorite);
          }
        },

        controls: {
          enumerable: true,
          get: function getControls() {
            return controls;
          }
        },

        showChart: {
          enumerable: true,
          value: function showChart() {
            var self = this;
            self.viewMode = 'chart';
          }
        },

        showTable: {
          enumerable: true,
          value: function showTable() {
            var self = this;
            self.viewMode = 'table';
          }
        },
        
        toggleFavorite: {
          enumerable: true,
          value: function toggleFavorite() {
            var self = this;

            if (self.isFavorite) {
              favorite.$delete();
              favorite = null;
            } else {
              favorite = $favorite.$push({ path: linkUri.toString() });
            }
          }
        },

        filterApplied: {
          enumerable: true,
          get: function isFilterApplied() {
            return filterApplied;
          }
        },

        applyFilter: {
          enumerable: true,
          value: function () {
            this.updateParameters();

            filterApplied = true;
          }
        },
        
        updateParameters: {
          enumerable: true,
          value: function () {
            var self = this;

            $log.debug('updateParameters', self.parameters);

            parameters = _.reduce(self.controls, function buildParameters(acc, control) {
              var id = control.id,
                  value = _.cloneDeep(control.value);
              acc[id] = value;
              return acc;
            }, {});
          }
        },

        resetFilter: {
          enumerable: true,
          value: function () {
            var self = this;

            $log.debug('resetFilter', self.parameters, self.controls);

            // reset all controls to default value, control.state.value
            _.each(self.controls, resetControl);
          }
        },

        controlView: {
          enumerable: true,
          value: function controlView(control) {
            var self = this;

            if (self.report.filters && self.report.filters[control.id]) {
              return self.report.filters[control.id].view;
            }
            
            $log.debug('Control Id:', control.id);
        
            switch (control.type) {
              case 'multiSelect':
                return 'views/filters/multi-select.html';
              case 'singleSelect':
                return 'views/filters/single-select.html';
              case 'bool':
                return 'views/filters/bool.html';
              case 'singleSelectRadio':
                return 'views/filters/single-select-radio.html';
              case 'multiSelectCheckbox':
                return 'views/filters/multi-select-checkbox.html';
              case 'singleValue':
                return 'views/filters/single-value.html';
              case 'singleValueText':
                return 'views/filters/single-value-text.html';
              case 'singleValueNumber':
                return 'views/filters/single-value-number.html';
              case 'singleValueDate':
                return 'views/filters/single-value-date.html';
              case 'singleValueDatetime':
                return 'views/filters/single-value-datetime.html';
              case 'singleValueTime':
                return 'views/filters/single-value-time.html';
              default:
                return null;
            }
          }
        },

        panelOpen: {
          enumerable: true,
          get: function getPanelOpen() {
            return panelOpen;
          },
          set: function setPanelOpen(value) {
            panelOpen = value;
          }
        },

        edit: {
          enumerable: true,
          value: function edit($event) {
            $event.preventDefault();
            if (categoryId === 'Custom') {
              $location.path('/analytics/custom/adhoc/' + report.id);
            } else {
              showCopyReportModal = true;
            }
          }
        },

        showCopyReportModal: {
          enumerable: true,
          get: function getShowCopyReportModal() {
            return showCopyReportModal;
          }
        },

        cancelCopyReport: {
          enumerable: true,
          value: function cancelCopyReport($event) {
            $event.preventDefault();
            showCopyReportModal = false;
          }
        },

        copyReport: {
          enumerable: true,
          value: function copyReport($event) {
            $event.preventDefault();
            showCopyReportModal = false;
            report.$copy('My ' + report.label).then(function copyReportResponse(newReport) {
              $location.path('/analytics/custom/adhoc/' + newReport.id);
            });
          }
        }
      });

      // watch parameters and reload table.
      // This is needed because Google Table visualization is a generic directive that is monitoring the table value on scope and is not parameter/report aware.
      // The Jasper Embed on the other hand is parameter aware and will automatically update on applyFilter
      $scope.$watch('parameters', function (newValue, oldValue) {
        if (newValue !== oldValue || forceUpdate) {
          updateTable($scope.parameters);
          updateExportParameters($scope.parameters);
        }
      });
      
      function getFilterValue(value, type){
        switch(type){
          case 'singleValueNumber':
            return parseFloat(value);
          default:
            return value;
        }
      }
      
    }]);

}) (window.angular, window.novantas, window._, window.URI);