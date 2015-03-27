(function (){

    describe('resourcesController', function () {

        var $controllerConstructor,
            scope;

        beforeEach(module('resources'));
        beforeEach(inject(function($controller, $rootScope){
            $controllerConstructor = $controller;
            scope = $rootScope.$new();
        }));

        it('should have some resources', function() {
            var ctrl = $controllerConstructor(
                'resourcesController', {
                    $scope: scope
                });
            expect(ctrl.resources.length).toBeGreaterThan(0)
        });
    });

})();
