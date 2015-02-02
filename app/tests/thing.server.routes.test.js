'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Thing = mongoose.model('Thing'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, thing;

/**
 * Thing routes tests
 */
describe('Thing CRUD tests', function() {
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

		// Save a user to the test db and create new Thing
		user.save(function() {
			thing = {
				name: 'Thing Name'
			};

			done();
		});
	});

	it('should be able to save Thing instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Thing
				agent.post('/things')
					.send(thing)
					.expect(200)
					.end(function(thingSaveErr, thingSaveRes) {
						// Handle Thing save error
						if (thingSaveErr) done(thingSaveErr);

						// Get a list of Things
						agent.get('/things')
							.end(function(thingsGetErr, thingsGetRes) {
								// Handle Thing save error
								if (thingsGetErr) done(thingsGetErr);

								// Get Things list
								var things = thingsGetRes.body;

								// Set assertions
								(things[0].user._id).should.equal(userId);
								(things[0].name).should.match('Thing Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Thing instance if not logged in', function(done) {
		agent.post('/things')
			.send(thing)
			.expect(401)
			.end(function(thingSaveErr, thingSaveRes) {
				// Call the assertion callback
				done(thingSaveErr);
			});
	});

	it('should not be able to save Thing instance if no name is provided', function(done) {
		// Invalidate name field
		thing.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Thing
				agent.post('/things')
					.send(thing)
					.expect(400)
					.end(function(thingSaveErr, thingSaveRes) {
						// Set message assertion
						(thingSaveRes.body.message).should.match('Please fill Thing name');
						
						// Handle Thing save error
						done(thingSaveErr);
					});
			});
	});

	it('should be able to update Thing instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Thing
				agent.post('/things')
					.send(thing)
					.expect(200)
					.end(function(thingSaveErr, thingSaveRes) {
						// Handle Thing save error
						if (thingSaveErr) done(thingSaveErr);

						// Update Thing name
						thing.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Thing
						agent.put('/things/' + thingSaveRes.body._id)
							.send(thing)
							.expect(200)
							.end(function(thingUpdateErr, thingUpdateRes) {
								// Handle Thing update error
								if (thingUpdateErr) done(thingUpdateErr);

								// Set assertions
								(thingUpdateRes.body._id).should.equal(thingSaveRes.body._id);
								(thingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Things if not signed in', function(done) {
		// Create new Thing model instance
		var thingObj = new Thing(thing);

		// Save the Thing
		thingObj.save(function() {
			// Request Things
			request(app).get('/things')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Thing if not signed in', function(done) {
		// Create new Thing model instance
		var thingObj = new Thing(thing);

		// Save the Thing
		thingObj.save(function() {
			request(app).get('/things/' + thingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', thing.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Thing instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Thing
				agent.post('/things')
					.send(thing)
					.expect(200)
					.end(function(thingSaveErr, thingSaveRes) {
						// Handle Thing save error
						if (thingSaveErr) done(thingSaveErr);

						// Delete existing Thing
						agent.delete('/things/' + thingSaveRes.body._id)
							.send(thing)
							.expect(200)
							.end(function(thingDeleteErr, thingDeleteRes) {
								// Handle Thing error error
								if (thingDeleteErr) done(thingDeleteErr);

								// Set assertions
								(thingDeleteRes.body._id).should.equal(thingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Thing instance if not signed in', function(done) {
		// Set Thing user 
		thing.user = user;

		// Create new Thing model instance
		var thingObj = new Thing(thing);

		// Save the Thing
		thingObj.save(function() {
			// Try deleting Thing
			request(app).delete('/things/' + thingObj._id)
			.expect(401)
			.end(function(thingDeleteErr, thingDeleteRes) {
				// Set message assertion
				(thingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Thing error error
				done(thingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Thing.remove().exec();
		done();
	});
});