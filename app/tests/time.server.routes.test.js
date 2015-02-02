'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Time = mongoose.model('Time'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, time;

/**
 * Time routes tests
 */
describe('Time CRUD tests', function() {
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

		// Save a user to the test db and create new Time
		user.save(function() {
			time = {
				name: 'Time Name'
			};

			done();
		});
	});

	it('should be able to save Time instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Time
				agent.post('/times')
					.send(time)
					.expect(200)
					.end(function(timeSaveErr, timeSaveRes) {
						// Handle Time save error
						if (timeSaveErr) done(timeSaveErr);

						// Get a list of Times
						agent.get('/times')
							.end(function(timesGetErr, timesGetRes) {
								// Handle Time save error
								if (timesGetErr) done(timesGetErr);

								// Get Times list
								var times = timesGetRes.body;

								// Set assertions
								(times[0].user._id).should.equal(userId);
								(times[0].name).should.match('Time Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Time instance if not logged in', function(done) {
		agent.post('/times')
			.send(time)
			.expect(401)
			.end(function(timeSaveErr, timeSaveRes) {
				// Call the assertion callback
				done(timeSaveErr);
			});
	});

	it('should not be able to save Time instance if no name is provided', function(done) {
		// Invalidate name field
		time.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Time
				agent.post('/times')
					.send(time)
					.expect(400)
					.end(function(timeSaveErr, timeSaveRes) {
						// Set message assertion
						(timeSaveRes.body.message).should.match('Please fill Time name');
						
						// Handle Time save error
						done(timeSaveErr);
					});
			});
	});

	it('should be able to update Time instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Time
				agent.post('/times')
					.send(time)
					.expect(200)
					.end(function(timeSaveErr, timeSaveRes) {
						// Handle Time save error
						if (timeSaveErr) done(timeSaveErr);

						// Update Time name
						time.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Time
						agent.put('/times/' + timeSaveRes.body._id)
							.send(time)
							.expect(200)
							.end(function(timeUpdateErr, timeUpdateRes) {
								// Handle Time update error
								if (timeUpdateErr) done(timeUpdateErr);

								// Set assertions
								(timeUpdateRes.body._id).should.equal(timeSaveRes.body._id);
								(timeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Times if not signed in', function(done) {
		// Create new Time model instance
		var timeObj = new Time(time);

		// Save the Time
		timeObj.save(function() {
			// Request Times
			request(app).get('/times')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Time if not signed in', function(done) {
		// Create new Time model instance
		var timeObj = new Time(time);

		// Save the Time
		timeObj.save(function() {
			request(app).get('/times/' + timeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', time.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Time instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Time
				agent.post('/times')
					.send(time)
					.expect(200)
					.end(function(timeSaveErr, timeSaveRes) {
						// Handle Time save error
						if (timeSaveErr) done(timeSaveErr);

						// Delete existing Time
						agent.delete('/times/' + timeSaveRes.body._id)
							.send(time)
							.expect(200)
							.end(function(timeDeleteErr, timeDeleteRes) {
								// Handle Time error error
								if (timeDeleteErr) done(timeDeleteErr);

								// Set assertions
								(timeDeleteRes.body._id).should.equal(timeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Time instance if not signed in', function(done) {
		// Set Time user 
		time.user = user;

		// Create new Time model instance
		var timeObj = new Time(time);

		// Save the Time
		timeObj.save(function() {
			// Try deleting Time
			request(app).delete('/times/' + timeObj._id)
			.expect(401)
			.end(function(timeDeleteErr, timeDeleteRes) {
				// Set message assertion
				(timeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Time error error
				done(timeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Time.remove().exec();
		done();
	});
});