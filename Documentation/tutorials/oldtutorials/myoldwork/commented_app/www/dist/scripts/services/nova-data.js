(function (angular, app, _) {
  'use strict';

  app.factory('$novaData', ['$log', '$debug', '$api', '$cacheFactory', '$googleVisualization', '$q', '$location', '$config',
    function ($log, $debug, $api, $cacheFactory, $googleVisualization, $q, $location, $config) {
      var novaDataFactory = {},
        dataCacheKey = 'nova-data',
        dataCache = $cacheFactory.get(dataCacheKey) || $cacheFactory(dataCacheKey),
        selections = {
        };

      function toDataTable(tableData, propertyKeys) {
        return $googleVisualization.then(function withGoogleVisualization(gvis) {
          return new gvis.DataTable(tableData, _.invert(propertyKeys));
        });
      };

      Object.defineProperties(novaDataFactory, {

        setKey: {
          enumerable: true,
          value: function data(key, val) {
            var sargs = $location.search();
            if (val)
              sargs[key] = val;
            else
              delete sargs[key];
            
            $location.search(sargs);
            $location.replace();
            
            if (!_.isUndefined(val))
              selections[key] = val;
          }
        },

        getKey: {
          enumerable: true,
          value: function data(key, defval) {
            if (!_.isUndefined($location.search()[key]))
              return $location.search()[key];
            else if (_.isUndefined(selections[key]))
              this.setKey(key, defval);
            else 
              this.setKey(key, selections[key]); //this sets the search arg
              
            return selections[key];
          }
        },
        
        data: {
          enumerable: true,
          value: function data(reportPath, inputs) {
            var self = this,
              report = _.maybe($config.novaData.metadata, reportPath),
              cacheKey,
              cachedDataTable;

            if (!report) {
              $log.error('No report definition found for path', reportPath);
              return;
            }

            cacheKey = angular.toJson([report.path, inputs, 'data']);
            cachedDataTable = dataCache.get(cacheKey);

            if (_.isUndefined(cachedDataTable)) {
              self.dataPromise(reportPath, inputs).then(function (dataTable) {
                dataCache.put(cacheKey, dataTable);
              });
              return null;
            }

            return cachedDataTable;
          }
        },

        dataPromise: {
          enumerable: true,
          value: function dataPromise(reportPath, inputs) {
            var report,
              cacheKey,
              cachedPromise;
              
            if (typeof reportPath == 'string')
              report = _.maybe($config.novaData.metadata, reportPath)
            else
              report = reportPath;
              
            if (!report) {
              $log.error('No report definition found for path', reportPath);
              return $q.reject('No report definition found for path', reportPath);
            }

            cacheKey = angular.toJson([report.path, inputs, 'data', 'promise']);
            cachedPromise = dataCache.get(cacheKey);

            if (cachedPromise) {
              return cachedPromise;
            }

            inputs = _.transform(inputs, function setInputKey(result, value, key) {
              var jasperKey = report.inputs[key];

              delete result[key];

              if (!jasperKey) {
                $log.warn('Input key not recognized, skipping', key, report);
                return;
              }

              result[jasperKey] = value;
            });

            $log.debug('Loading nova data from API', report.path, inputs);
            cachedPromise = $api.jasper.data(report.path, inputs).then(function readReportData(data) {
              return toDataTable(data, report.columns).then(function addIndexes(dataTable) {
                _(report.indexes).each(dataTable.addDataIndex, dataTable);
                return dataTable;
              });
            }, function errorReadingReportData(error) {
              $log.error('Error reading nova report data', error, report);
              dataCache.remove(cacheKey);
              return $q.reject(error);
            });
            dataCache.put(cacheKey, cachedPromise);

            return cachedPromise;
          }
        }
      });

      $api.onLogout(function(){
        dataCache.removeAll();
      });
      
      $debug.services.$novaData = novaDataFactory;
      return novaDataFactory;
    }]);

}) (window.angular, window.novantas, window._);