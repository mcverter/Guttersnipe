'use strict';

(function() {
	// Things Controller Spec
	describe('Things Controller Tests', function() {
		// Initialize global variables
		var ThingsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Things controller.
			ThingsController = $controller('ThingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Thing object fetched from XHR', inject(function(Things) {
			// Create sample Thing using the Things service
			var sampleThing = new Things({
				name: 'New Thing'
			});

			// Create a sample Things array that includes the new Thing
			var sampleThings = [sampleThing];

			// Set GET response
			$httpBackend.expectGET('things').respond(sampleThings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.things).toEqualData(sampleThings);
		}));

		it('$scope.findOne() should create an array with one Thing object fetched from XHR using a thingId URL parameter', inject(function(Things) {
			// Define a sample Thing object
			var sampleThing = new Things({
				name: 'New Thing'
			});

			// Set the URL parameter
			$stateParams.thingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/things\/([0-9a-fA-F]{24})$/).respond(sampleThing);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.thing).toEqualData(sampleThing);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Things) {
			// Create a sample Thing object
			var sampleThingPostData = new Things({
				name: 'New Thing'
			});

			// Create a sample Thing response
			var sampleThingResponse = new Things({
				_id: '525cf20451979dea2c000001',
				name: 'New Thing'
			});

			// Fixture mock form input values
			scope.name = 'New Thing';

			// Set POST response
			$httpBackend.expectPOST('things', sampleThingPostData).respond(sampleThingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Thing was created
			expect($location.path()).toBe('/things/' + sampleThingResponse._id);
		}));

		it('$scope.update() should update a valid Thing', inject(function(Things) {
			// Define a sample Thing put data
			var sampleThingPutData = new Things({
				_id: '525cf20451979dea2c000001',
				name: 'New Thing'
			});

			// Mock Thing in scope
			scope.thing = sampleThingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/things\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/things/' + sampleThingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid thingId and remove the Thing from the scope', inject(function(Things) {
			// Create new Thing object
			var sampleThing = new Things({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Things array and include the Thing
			scope.things = [sampleThing];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/things\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleThing);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.things.length).toBe(0);
		}));
	});
}());