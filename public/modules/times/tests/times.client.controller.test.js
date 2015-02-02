'use strict';

(function() {
	// Times Controller Spec
	describe('Times Controller Tests', function() {
		// Initialize global variables
		var TimesController,
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

			// Initialize the Times controller.
			TimesController = $controller('TimesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Time object fetched from XHR', inject(function(Times) {
			// Create sample Time using the Times service
			var sampleTime = new Times({
				name: 'New Time'
			});

			// Create a sample Times array that includes the new Time
			var sampleTimes = [sampleTime];

			// Set GET response
			$httpBackend.expectGET('times').respond(sampleTimes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.times).toEqualData(sampleTimes);
		}));

		it('$scope.findOne() should create an array with one Time object fetched from XHR using a timeId URL parameter', inject(function(Times) {
			// Define a sample Time object
			var sampleTime = new Times({
				name: 'New Time'
			});

			// Set the URL parameter
			$stateParams.timeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/times\/([0-9a-fA-F]{24})$/).respond(sampleTime);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.time).toEqualData(sampleTime);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Times) {
			// Create a sample Time object
			var sampleTimePostData = new Times({
				name: 'New Time'
			});

			// Create a sample Time response
			var sampleTimeResponse = new Times({
				_id: '525cf20451979dea2c000001',
				name: 'New Time'
			});

			// Fixture mock form input values
			scope.name = 'New Time';

			// Set POST response
			$httpBackend.expectPOST('times', sampleTimePostData).respond(sampleTimeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Time was created
			expect($location.path()).toBe('/times/' + sampleTimeResponse._id);
		}));

		it('$scope.update() should update a valid Time', inject(function(Times) {
			// Define a sample Time put data
			var sampleTimePutData = new Times({
				_id: '525cf20451979dea2c000001',
				name: 'New Time'
			});

			// Mock Time in scope
			scope.time = sampleTimePutData;

			// Set PUT response
			$httpBackend.expectPUT(/times\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/times/' + sampleTimePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid timeId and remove the Time from the scope', inject(function(Times) {
			// Create new Time object
			var sampleTime = new Times({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Times array and include the Time
			scope.times = [sampleTime];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/times\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTime);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.times.length).toBe(0);
		}));
	});
}());