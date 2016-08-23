(function (angular, app, _, URI) {

  'use strict';

  app.controller('ReportCtrl', ['$scope', '$log', '$report', '$routeParams', '$favorite', '$viewingHistory', '$location', '$config', '$googleVisualization', '$api', '$q',
    function ($scope, $log, $report, $routeParams, $favorite, $viewingHistory, $location, $config, $googleVisualization, $api, $q) {
      var categoryId = $routeParams.categoryId,
          favorite,
          reportId = $routeParams.reportId,
          linkUri = URI($location.path().substring(1)),
          parameters,
          exportParameters,
          reportFactory,
          report = {},
          reportTitle,
          controls,
          components = [],
          componentCount = -1,
          forceUpdate = false,
          table,
          tableChart,
          viewMode = 'chart',
          panelOpen = false,
          rightPanelOpen = false,
          showCopyReportModal = false,
          filterApplied = false,
          isReady = false,
          exportTypes = [
            {fmt: 'PDF', enabled: function() {
              // TODO: disable PDF export with PhantomJS for current release;
              return ($scope.viewMode === 'chart' && jasperView());
            }
            },
            {fmt: 'PNG', enabled: function() {
              return $scope.viewMode === 'chart' && !jasperView();
            }
            },
            {fmt: 'CSV', enabled: function() {
              return $scope.viewMode === 'table' || !$scope.viewModeEnabled('table');
            }},
            {fmt: 'XLSX', enabled: function() {
              return $scope.viewMode === 'table' || jasperView();
            }},
            {fmt: 'DOCX', enabled: function() {
              // JIRA SHC-312: "Remove DOCX export from Stratascae"
              return false && ($scope.viewMode === 'table' || jasperView());
            }}
          ],
          jasperView = function() {
            return !$scope.report.custom;
          },
          updateTable = function updateTable(parameters) {
            // If this is a view supplied by jasper there is no need to load table data;
            if (!parameters || jasperView()) {
              return;
            }
            forceUpdate = false, redrawChart = false;

            $api.logEvent({location:$location.url(), entryType:'ReportExecution', parameters: parameters});

            $scope.beginAction('loadingReportData', 'Loading report data');

            report.table(parameters).then(function (t) {
              $scope.endAction('loadingReportData');

              $googleVisualization.then(function (vis) {
                table = new vis.DataTable(t);
                if (tableChart) {
                  tableChart.draw(table, {
                    title: ''
                  });
                }
                redrawChart = true;
              }, function (err) {
                $scope.showError('Error loading report data');
                
                $scope.filterApplied = false;
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
          },
          loadControlValues = function(){
            var args = $location.search();
            
            _.each(components, function(c){
              if (_.isFunction(c.loadValues)){
                c.loadValues(args);
              }
            });
          },
          saveControlValues = function(){
            var args = {};
            
            _.each(components, function(c){
              if (_.isFunction(c.saveValues))
                c.saveValues(args);
            });
            
            $location.search(args);
            $location.replace();
          },
          defaultComponent = function(control){
            return {
              saveValues: function(args){
                args[control.id] = parameters[control.id];
              },
              loadValues: function(args){
                if (args[control.id]){
                  if (control.state.options && !_.isArray(args[control.id]))
                    control.value = [args[control.id]];
                  else
                    control.value = args[control.id];
                }
              }
            };
          };

      // when the report service loads the user's reports then retrieve the currently selected report
      $report.onLoad(function () {
        $report.get(reportId).then(function (r) {
          $log.debug('ReportCtrl, Loaded Report', r);
          report = r;
          
          if (report.defaultViewMode)
            $scope.viewMode = report.defaultViewMode;
          
          var controlPromise = $scope.disableControls?$scope.resolvedPromise([]):report.controls();

          $scope.beginAction('loadingReportControls', 'Loading report controls...');

          controlPromise.then(function(c) {
            $scope.endAction('loadingReportControls');

            controls = c;

            //get expected number of components that will register
            componentCount = controls.length
                + (_.maybe(report, 'widgets.length') || 0)
                + (_.maybe(report, 'widgets_rhs.length') || 0);

            //need to apply default values
            _.each(c, function (item) {
              if (_(item.value).isUndefined())
                resetControl(item);
              if (!report.filters || (report.filters && !report.filters[item.id]))
                $scope.registerComponent(defaultComponent(item));
            });

            panelOpen = _.toBoolean(_.maybe(controls, 'length') || _.maybe(report, 'widgets.length'));
            rightPanelOpen = _.toBoolean(_.maybe(report, 'widgets_rhs.length'));
            
            //then apply the filter so table gets loaded
            $scope.updateParameters();
            
            if (!controls.length) {
              filterApplied = true;
              forceUpdate = true;
            }

            if (!componentCount)
              isReady = true;
            
            //wait for all components to register
            $scope.waitFor(function(){
              return isReady;
            }).then(function(){
              loadControlValues();
              if ($scope.hideChrome)
                $scope.applyFilter();
            });
          }, function (err) {
            $scope.endAction('loadingReportControls');
            $scope.showError('Error loading report controls!');
            $scope.filterApplied = false;
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

        exportReport: {
          enumerable: true,
          value: function exportReport(fmt) {
            
            saveControlValues();
            
            $api.logEvent({location:$location.url(), entryType:'ReportExport', parameters: this.parameters, format: fmt});

            //jasper view we can go right to download
            if ($scope.viewMode === 'chart' && jasperView()) {
              if (_.isString(this.exportPath)) {
                var chartLink = URI(this.exportPath + '.' + fmt).query(this.parameters).toString();
                
                $scope.showDownloadLink(chartLink);
              }
              return;
            }
            
            var inputParameters = _.extend(this.parameters ? this.parameters : {}, {
              format: fmt,
              data: this.table,
              id: this.report.id,
              absUrl: $location.absUrl(),
              urlParams: {
                hc: 1
              }
            });

            $scope.beginAction('exportingReport', 'Exporting data');
            $api.jasper.export(this.report.uri, inputParameters, $scope.viewMode === 'table' ? 'table' : 'capture')
              .then(function(url){
                $scope.endAction('exportingReport');
                
                $scope.showDownloadLink(url);
              }, function(err){
                $scope.endAction('exportingReport');
                $scope.showError('Error exporting data');
              });
          }
        },

        tableChartReady: {
          enumerable: true,
          value: function tableChartReady(chart) {
            tableChart = chart;
            updateTable($scope.parameters);
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
              return 'bower_components/novafoundation/app/views/report-views/empty_report.html';
            else if (self.viewMode === 'table') {
              return 'bower_components/novafoundation/app/views/report-views/google-table.html';
            } else if (self.viewMode === 'chart') {
              if (_.maybe(self, 'report.custom'))
                return  getViewPath(self.report.custom.view);
              else
                return 'bower_components/novafoundation/app/views/report-views/jasper-embed.html';
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
        
        viewPath: {
          enumerable: true,
          value: function viewPath(view) {
            return getViewPath(view);
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
          },
          set: function setFilterApplied(value) {
            filterApplied = value;
          }
        },

        applyFilter: {
          enumerable: true,
          value: function () {
            this.updateParameters();

            saveControlValues();

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
              return getViewPath(self.report.filters[control.id].view);
            }
            
            $log.debug('Control Id:', control.id);
        
            switch (control.type) {
              case 'multiSelect':
                return 'bower_components/novafoundation/app/views/filters/multi-select.html';
              case 'singleSelect':
                return 'bower_components/novafoundation/app/views/filters/single-select.html';
              case 'bool':
                return 'bower_components/novafoundation/app/views/filters/bool.html';
              case 'singleSelectRadio':
                return 'bower_components/novafoundation/app/views/filters/single-select-radio.html';
              case 'multiSelectCheckbox':
                return 'bower_components/novafoundation/app/views/filters/multi-select-checkbox.html';
              case 'singleValue':
                return 'bower_components/novafoundation/app/views/filters/single-value.html';
              case 'singleValueText':
                return 'bower_components/novafoundation/app/views/filters/single-value-text.html';
              case 'singleValueNumber':
                return 'bower_components/novafoundation/app/views/filters/single-value-number.html';
              case 'singleValueDate':
                return 'bower_components/novafoundation/app/views/filters/single-value-date.html';
              case 'singleValueDatetime':
                return 'bower_components/novafoundation/app/views/filters/single-value-datetime.html';
              case 'singleValueTime':
                return 'bower_components/novafoundation/app/views/filters/single-value-time.html';
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
            report.$copy('My ' + report.label, report.description).then(function copyReportResponse(newReport) {
              $location.path('/analytics/custom/adhoc/' + newReport.id);
            });
          }
        },

        viewModeEnabled: {
          enumerable: true,
          value: function isViewModeEnabled(modeId) {
            return report.viewModeEnabled ? report.viewModeEnabled(modeId) : true;
          }
        },

        registerComponent: {
          enumerable: true,
          value: function(c) {
            var promises;

            components.push(c);
            
            //if everyone has registered then wait
            if (components.length === componentCount) {
              promises = _.reduce(components, function(acc, item){
                if (_.isFunction(item.load))
                  acc.push(item.load())
                return acc;
              }, []);

              $q.all(promises).then(function(d) {
                _.each(components, function(c) {
                  if (_.isFunction(c.complete))
                    c.complete(); // Execute final action, if any.
                });
                isReady = true; 
              }, function(e) {
                _.each(components, function(c) {
                  if (_.isFunction(c.failed)) {
                    c.failed(); // Execute final action, if any.
                  }
                });
                isReady = true; 
              });
            }
          }
        }
      });

      // watch parameters and reload table.
      // This is needed because Google Table visualization is a generic directive that is monitoring the table value on scope and is not parameter/report aware.
      // The Jasper Embed on the other hand is parameter aware and will automatically update on applyFilter
      $scope.$watch('parameters', function (newValue, oldValue) {
        if (newValue !== oldValue || forceUpdate) {
          if (filterApplied)
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
      
      var foundationViews = {
        'views/customViews/d3barchart.html': true,
        'views/customViews/d3scatterlinechart.html': true,
        'views/customViews/heat-map.html': true,
        'views/custom_filters/enum_range.html': true,
        'views/custom_filters/pickmanyplusone.html': true,
        'views/custom_filters/picktwo.html': true,
        'views/custom_filters/bc_shopper_profile.html': true,
        'views/widgets/advisor.html': true,
        'views/widgets/desc.html': true,
        'views/widgets/heat-map-color-range.html': true,
        'views/widgets/heat-map-metric-selector.html': true,
        'views/widgets/heat-map-related-reports.html': true,
        'views/widgets/hierarchical_selector.html': true,
        'views/widgets/hierarchical_selector_group.html': true,
        'views/widgets/title_formatter.html': true
      };
      function getViewPath(view) {
        if (foundationViews[view])
          return 'bower_components/novafoundation/app/' + view;
        return view;
      }
      
    }]);

}) (window.angular, window.novantas, window._, window.URI);
