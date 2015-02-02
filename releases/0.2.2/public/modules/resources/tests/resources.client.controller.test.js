'use strict';

(function() {
	// Resources Controller Spec
	describe('Resources Controller Tests', function() {
		// Initialize global variables
		var ResourcesController,
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

			// Initialize the Resources controller.
			ResourcesController = $controller('ResourcesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Resource object fetched from XHR', inject(function(Resources) {
			// Create sample Resource using the Resources service
			var sampleResource = new Resources({
				name: 'New Resource'
			});

			// Create a sample Resources array that includes the new Resource
			var sampleResources = [sampleResource];

			// Set GET response
			$httpBackend.expectGET('resources').respond(sampleResources);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resources).toEqualData(sampleResources);
		}));

		it('$scope.findOne() should create an array with one Resource object fetched from XHR using a resourceId URL parameter', inject(function(Resources) {
			// Define a sample Resource object
			var sampleResource = new Resources({
				name: 'New Resource'
			});

			// Set the URL parameter
			$stateParams.resourceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/resources\/([0-9a-fA-F]{24})$/).respond(sampleResource);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.resource).toEqualData(sampleResource);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Resources) {
			// Create a sample Resource object
			var sampleResourcePostData = new Resources({
				name: 'New Resource'
			});

			// Create a sample Resource response
			var sampleResourceResponse = new Resources({
				_id: '525cf20451979dea2c000001',
				name: 'New Resource'
			});

			// Fixture mock form input values
			scope.name = 'New Resource';

			// Set POST response
			$httpBackend.expectPOST('resources', sampleResourcePostData).respond(sampleResourceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Resource was created
			expect($location.path()).toBe('/resources/' + sampleResourceResponse._id);
		}));

		it('$scope.update() should update a valid Resource', inject(function(Resources) {
			// Define a sample Resource put data
			var sampleResourcePutData = new Resources({
				_id: '525cf20451979dea2c000001',
				name: 'New Resource'
			});

			// Mock Resource in scope
			scope.resource = sampleResourcePutData;

			// Set PUT response
			$httpBackend.expectPUT(/resources\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/resources/' + sampleResourcePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid resourceId and remove the Resource from the scope', inject(function(Resources) {
			// Create new Resource object
			var sampleResource = new Resources({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Resources array and include the Resource
			scope.resources = [sampleResource];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/resources\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleResource);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.resources.length).toBe(0);
		}));
	});
}());