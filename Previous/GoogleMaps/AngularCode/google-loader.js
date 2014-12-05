(function (angular, $, _, google) {

  'use strict';

  angular.module('google-loader', [])
      .run(['$log', '$q',
        function ($log, $q) {
          // wrapper creates a deferred object that is resolved after google loader has been initialized
          google.load = _(google.load).wrap(function (gl, library, version, parameters) {
            var deferred = $q.defer(),
              callback = _(parameters.callback).wrap(function wrapCallback(cb) {
                if (cb) {
                  cb();
                }
                $log.debug('Loaded', library, version);
                deferred.resolve(google.load);
              })
              .value();

            parameters = parameters || {};
            parameters.callback = callback;

            /*jshint camelcase: false */
            if (parameters.other_params) {
              parameters.other_params = $.param(parameters.other_params);
            }

            $log.debug('Loading', library, version, parameters);
            gl(library, version, parameters);

            return deferred.promise;
          })
          .value();
        }]);

}) (window.angular, window.jQuery, window._, window.google);