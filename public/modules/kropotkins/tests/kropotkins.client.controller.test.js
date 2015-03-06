function (angular, _) {
  'use strict';
	/*
	// Kropotkins Controller Spec
	describe('Kropotkins Controller Tests', function() {
		// Initialize global variables
		var KropotkinsController,
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

			// Initialize the Kropotkins controller.
			KropotkinsController = $controller('KropotkinsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Kropotkin object fetched from XHR', inject(function(Kropotkins) {
			// Create sample Kropotkin using the Kropotkins service
			var sampleKropotkin = new Kropotkins({
				name: 'New Kropotkin'
			});

			// Create a sample Kropotkins array that includes the new Kropotkin
			var sampleKropotkins = [sampleKropotkin];

			// Set GET response
			$httpBackend.expectGET('kropotkins').respond(sampleKropotkins);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.kropotkins).toEqualData(sampleKropotkins);
		}));

		it('$scope.findOne() should create an array with one Kropotkin object fetched from XHR using a kropotkinId URL parameter', inject(function(Kropotkins) {
			// Define a sample Kropotkin object
			var sampleKropotkin = new Kropotkins({
				name: 'New Kropotkin'
			});

			// Set the URL parameter
			$stateParams.kropotkinId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/kropotkins\/([0-9a-fA-F]{24})$/).respond(sampleKropotkin);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.kropotkin).toEqualData(sampleKropotkin);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Kropotkins) {
			// Create a sample Kropotkin object
			var sampleKropotkinPostData = new Kropotkins({
				name: 'New Kropotkin'
			});

			// Create a sample Kropotkin response
			var sampleKropotkinResponse = new Kropotkins({
				_id: '525cf20451979dea2c000001',
				name: 'New Kropotkin'
			});

			// Fixture mock form input values
			scope.name = 'New Kropotkin';

			// Set POST response
			$httpBackend.expectPOST('kropotkins', sampleKropotkinPostData).respond(sampleKropotkinResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Kropotkin was created
			expect($location.path()).toBe('/kropotkins/' + sampleKropotkinResponse._id);
		}));

		it('$scope.update() should update a valid Kropotkin', inject(function(Kropotkins) {
			// Define a sample Kropotkin put data
			var sampleKropotkinPutData = new Kropotkins({
				_id: '525cf20451979dea2c000001',
				name: 'New Kropotkin'
			});

			// Mock Kropotkin in scope
			scope.kropotkin = sampleKropotkinPutData;

			// Set PUT response
			$httpBackend.expectPUT(/kropotkins\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/kropotkins/' + sampleKropotkinPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid kropotkinId and remove the Kropotkin from the scope', inject(function(Kropotkins) {
			// Create new Kropotkin object
			var sampleKropotkin = new Kropotkins({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Kropotkins array and include the Kropotkin
			scope.kropotkins = [sampleKropotkin];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/kropotkins\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleKropotkin);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.kropotkins.length).toBe(0);
		}));
		*/
}(window.angular, window._));