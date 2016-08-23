'use strict';

(function() {
	// Places Controller Spec
	describe('Places Controller Tests', function() {
		// Initialize global variables
		var PlacesController,
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

			// Initialize the Places controller.
			PlacesController = $controller('PlacesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Place object fetched from XHR', inject(function(Places) {
			// Create sample Place using the Places service
			var samplePlace = new Places({
				name: 'New Place'
			});

			// Create a sample Places array that includes the new Place
			var samplePlaces = [samplePlace];

			// Set GET response
			$httpBackend.expectGET('places').respond(samplePlaces);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.places).toEqualData(samplePlaces);
		}));

		it('$scope.findOne() should create an array with one Place object fetched from XHR using a placeId URL parameter', inject(function(Places) {
			// Define a sample Place object
			var samplePlace = new Places({
				name: 'New Place'
			});

			// Set the URL parameter
			$stateParams.placeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/places\/([0-9a-fA-F]{24})$/).respond(samplePlace);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.place).toEqualData(samplePlace);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Places) {
			// Create a sample Place object
			var samplePlacePostData = new Places({
				name: 'New Place'
			});

			// Create a sample Place response
			var samplePlaceResponse = new Places({
				_id: '525cf20451979dea2c000001',
				name: 'New Place'
			});

			// Fixture mock form input values
			scope.name = 'New Place';

			// Set POST response
			$httpBackend.expectPOST('places', samplePlacePostData).respond(samplePlaceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Place was created
			expect($location.path()).toBe('/places/' + samplePlaceResponse._id);
		}));

		it('$scope.update() should update a valid Place', inject(function(Places) {
			// Define a sample Place put data
			var samplePlacePutData = new Places({
				_id: '525cf20451979dea2c000001',
				name: 'New Place'
			});

			// Mock Place in scope
			scope.place = samplePlacePutData;

			// Set PUT response
			$httpBackend.expectPUT(/places\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/places/' + samplePlacePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid placeId and remove the Place from the scope', inject(function(Places) {
			// Create new Place object
			var samplePlace = new Places({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Places array and include the Place
			scope.places = [samplePlace];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/places\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlace);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.places.length).toBe(0);
		}));
	});
}());