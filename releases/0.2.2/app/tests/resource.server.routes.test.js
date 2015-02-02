'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Resource = mongoose.model('Resource'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, resource;

/**
 * Resource routes tests
 */
describe('Resource CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Resource
		user.save(function() {
			resource = {
				name: 'Resource Name'
			};

			done();
		});
	});

	it('should be able to save Resource instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resource
				agent.post('/resources')
					.send(resource)
					.expect(200)
					.end(function(resourceSaveErr, resourceSaveRes) {
						// Handle Resource save error
						if (resourceSaveErr) done(resourceSaveErr);

						// Get a list of Resources
						agent.get('/resources')
							.end(function(resourcesGetErr, resourcesGetRes) {
								// Handle Resource save error
								if (resourcesGetErr) done(resourcesGetErr);

								// Get Resources list
								var resources = resourcesGetRes.body;

								// Set assertions
								(resources[0].user._id).should.equal(userId);
								(resources[0].name).should.match('Resource Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Resource instance if not logged in', function(done) {
		agent.post('/resources')
			.send(resource)
			.expect(401)
			.end(function(resourceSaveErr, resourceSaveRes) {
				// Call the assertion callback
				done(resourceSaveErr);
			});
	});

	it('should not be able to save Resource instance if no name is provided', function(done) {
		// Invalidate name field
		resource.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resource
				agent.post('/resources')
					.send(resource)
					.expect(400)
					.end(function(resourceSaveErr, resourceSaveRes) {
						// Set message assertion
						(resourceSaveRes.body.message).should.match('Please fill Resource name');
						
						// Handle Resource save error
						done(resourceSaveErr);
					});
			});
	});

	it('should be able to update Resource instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resource
				agent.post('/resources')
					.send(resource)
					.expect(200)
					.end(function(resourceSaveErr, resourceSaveRes) {
						// Handle Resource save error
						if (resourceSaveErr) done(resourceSaveErr);

						// Update Resource name
						resource.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Resource
						agent.put('/resources/' + resourceSaveRes.body._id)
							.send(resource)
							.expect(200)
							.end(function(resourceUpdateErr, resourceUpdateRes) {
								// Handle Resource update error
								if (resourceUpdateErr) done(resourceUpdateErr);

								// Set assertions
								(resourceUpdateRes.body._id).should.equal(resourceSaveRes.body._id);
								(resourceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Resources if not signed in', function(done) {
		// Create new Resource model instance
		var resourceObj = new Resource(resource);

		// Save the Resource
		resourceObj.save(function() {
			// Request Resources
			request(app).get('/resources')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Resource if not signed in', function(done) {
		// Create new Resource model instance
		var resourceObj = new Resource(resource);

		// Save the Resource
		resourceObj.save(function() {
			request(app).get('/resources/' + resourceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', resource.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Resource instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Resource
				agent.post('/resources')
					.send(resource)
					.expect(200)
					.end(function(resourceSaveErr, resourceSaveRes) {
						// Handle Resource save error
						if (resourceSaveErr) done(resourceSaveErr);

						// Delete existing Resource
						agent.delete('/resources/' + resourceSaveRes.body._id)
							.send(resource)
							.expect(200)
							.end(function(resourceDeleteErr, resourceDeleteRes) {
								// Handle Resource error error
								if (resourceDeleteErr) done(resourceDeleteErr);

								// Set assertions
								(resourceDeleteRes.body._id).should.equal(resourceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Resource instance if not signed in', function(done) {
		// Set Resource user 
		resource.user = user;

		// Create new Resource model instance
		var resourceObj = new Resource(resource);

		// Save the Resource
		resourceObj.save(function() {
			// Try deleting Resource
			request(app).delete('/resources/' + resourceObj._id)
			.expect(401)
			.end(function(resourceDeleteErr, resourceDeleteRes) {
				// Set message assertion
				(resourceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Resource error error
				done(resourceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Resource.remove().exec();
		done();
	});
});