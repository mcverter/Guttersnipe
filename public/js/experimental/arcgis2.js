/**
 * <div ng-app="webApp">
 <div ui-view=""></div>
 </div>
 */

angular.module('webApp', ['ui.router'])
    // service that deals w/ our dojo require
    .service('wish', function () {

        // it's not require... it's a wish?
        var wish = {};

        function _loadDependencies(deps, next) {
            var reqArr = _.values(deps),
                keysArr = _.keys(deps);

            // use the dojo require (required by arcgis + dojo) && save refs
            // to required obs
            require(reqArr, function () {
                var args = arguments;

                _.each(keysArr, function (name, idx) {
                    wish[name] = args[idx];
                });

                next();
            });
        }

        return {
            loadDependencies: function (deps, next) {
                _loadDependencies(deps, next);
            },

            get: function () {
                return wish;
            }
        };

    })
    // module (app) config
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/map');

        $stateProvider.state('map', {
            url: '/map',
            template: '<div id="map"></div>',
            controller: 'MapCtrl',
            resolve: {
                promiseObj: function ($q, $rootScope, wish) {
                    var deferred = $q.defer(),
                        deps = {
                            Map: 'esri/map',
                            FeatureLayer: 'esri/layers/FeatureLayer',
                            InfoTemplate: 'esri/InfoTemplate',
                            SimpleFillSymbol: 'esri/symbols/SimpleFillSymbol',
                            SimpleRenderer: 'esri/renderers/SimpleRenderer',
                            SimpleMarkerSymbol: 'esri/symbols/SimpleMarkerSymbol',
                            ScaleDependentRenderer: 'esri/renderers/ScaleDependentRenderer',
                            Color: 'dojo/_base/Color'
                        };

                    wish.loadDependencies(deps, function () {
                        deferred.resolve();
                        if (!$rootScope.$$phase) {
                            $rootScope.$apply();
                        }
                    });

                    return deferred.promise;
                }
            }
        });
    })
    // our map controller
    .controller('MapCtrl', function ($rootScope, $scope, wish) {

        var w = wish.get(),
            greenFill = new w.Color([133, 197, 133, 0.75]),
            greenOutline = new w.Color([133, 197, 133, 0.25]),
            layer,
            markerSym,
            renderer1,
            renderer2,

            CROPS_URL = 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/USA_County_Crops_2007/FeatureServer/0';

        $scope.map = new w.Map('map', {
            center: [-98.579, 39.828],
            zoom: 4,
            basemap: 'gray'
        });

        layer = new w.FeatureLayer(CROPS_URL, {
            outFields: ['STATE', 'COUNTY', 'M086_07', 'AREA'],
            infoTemplate: new w.InfoTemplate('${COUNTY}, ${STATE}', '<div style="font: 18px Segoe UI">The percentage of the area of the county that represents farmland is <b>${M086_07}%</b>.</div>')
        });
        layer.setDefinitionExpression('AREA>0.01 and M086_07>0');


        markerSym = new w.SimpleMarkerSymbol();
        markerSym.setColor(greenFill);
        markerSym.setOutline(markerSym.outline.setColor(greenOutline));
        renderer1 = new w.SimpleRenderer(markerSym);
        renderer1.setProportionalSymbolInfo({
            field: 'M086_07',
            minSize: 1,
            maxSize: 10,
            minDataValue: 0,
            maxDataValue: 100
        });

        //for the second renderer increase the dot sizes and set a backgroundFillSymbol
        renderer2 = new w.SimpleRenderer(markerSym);
        renderer2.setProportionalSymbolInfo({
            field: 'M086_07',
            minSize: 5,
            maxSize: 15,
            minDataValue: 0,
            maxDataValue: 100
        });

        layer.setRenderer(new w.ScaleDependentRenderer({
            rendererInfos: [{
                'renderer': renderer1,
                'minScale': 50000000,
                'maxScale': 10000000
            }, {
                'renderer': renderer2,
                'minScale': 0,
                'maxScale': 5000000
            }]
        }));

        $scope.map.addLayer(layer);
    });/**
 * Created by mitchell on 11/30/14.
 */
