'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Kropotkin = mongoose.model('Kropotkin'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, kropotkin;

/**
 * Kropotkin routes tests
 */
describe('Kropotkin CRUD tests', function() {
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

		// Save a user to the test db and create new Kropotkin
		user.save(function() {
			kropotkin = {
				name: 'Kropotkin Name'
			};

			done();
		});
	});

	it('should be able to save Kropotkin instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kropotkin
				agent.post('/kropotkins')
					.send(kropotkin)
					.expect(200)
					.end(function(kropotkinSaveErr, kropotkinSaveRes) {
						// Handle Kropotkin save error
						if (kropotkinSaveErr) done(kropotkinSaveErr);

						// Get a list of Kropotkins
						agent.get('/kropotkins')
							.end(function(kropotkinsGetErr, kropotkinsGetRes) {
								// Handle Kropotkin save error
								if (kropotkinsGetErr) done(kropotkinsGetErr);

								// Get Kropotkins list
								var kropotkins = kropotkinsGetRes.body;

								// Set assertions
								(kropotkins[0].user._id).should.equal(userId);
								(kropotkins[0].name).should.match('Kropotkin Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Kropotkin instance if not logged in', function(done) {
		agent.post('/kropotkins')
			.send(kropotkin)
			.expect(401)
			.end(function(kropotkinSaveErr, kropotkinSaveRes) {
				// Call the assertion callback
				done(kropotkinSaveErr);
			});
	});

	it('should not be able to save Kropotkin instance if no name is provided', function(done) {
		// Invalidate name field
		kropotkin.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kropotkin
				agent.post('/kropotkins')
					.send(kropotkin)
					.expect(400)
					.end(function(kropotkinSaveErr, kropotkinSaveRes) {
						// Set message assertion
						(kropotkinSaveRes.body.message).should.match('Please fill Kropotkin name');
						
						// Handle Kropotkin save error
						done(kropotkinSaveErr);
					});
			});
	});

	it('should be able to update Kropotkin instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kropotkin
				agent.post('/kropotkins')
					.send(kropotkin)
					.expect(200)
					.end(function(kropotkinSaveErr, kropotkinSaveRes) {
						// Handle Kropotkin save error
						if (kropotkinSaveErr) done(kropotkinSaveErr);

						// Update Kropotkin name
						kropotkin.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Kropotkin
						agent.put('/kropotkins/' + kropotkinSaveRes.body._id)
							.send(kropotkin)
							.expect(200)
							.end(function(kropotkinUpdateErr, kropotkinUpdateRes) {
								// Handle Kropotkin update error
								if (kropotkinUpdateErr) done(kropotkinUpdateErr);

								// Set assertions
								(kropotkinUpdateRes.body._id).should.equal(kropotkinSaveRes.body._id);
								(kropotkinUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Kropotkins if not signed in', function(done) {
		// Create new Kropotkin model instance
		var kropotkinObj = new Kropotkin(kropotkin);

		// Save the Kropotkin
		kropotkinObj.save(function() {
			// Request Kropotkins
			request(app).get('/kropotkins')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Kropotkin if not signed in', function(done) {
		// Create new Kropotkin model instance
		var kropotkinObj = new Kropotkin(kropotkin);

		// Save the Kropotkin
		kropotkinObj.save(function() {
			request(app).get('/kropotkins/' + kropotkinObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', kropotkin.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Kropotkin instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kropotkin
				agent.post('/kropotkins')
					.send(kropotkin)
					.expect(200)
					.end(function(kropotkinSaveErr, kropotkinSaveRes) {
						// Handle Kropotkin save error
						if (kropotkinSaveErr) done(kropotkinSaveErr);

						// Delete existing Kropotkin
						agent.delete('/kropotkins/' + kropotkinSaveRes.body._id)
							.send(kropotkin)
							.expect(200)
							.end(function(kropotkinDeleteErr, kropotkinDeleteRes) {
								// Handle Kropotkin error error
								if (kropotkinDeleteErr) done(kropotkinDeleteErr);

								// Set assertions
								(kropotkinDeleteRes.body._id).should.equal(kropotkinSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Kropotkin instance if not signed in', function(done) {
		// Set Kropotkin user 
		kropotkin.user = user;

		// Create new Kropotkin model instance
		var kropotkinObj = new Kropotkin(kropotkin);

		// Save the Kropotkin
		kropotkinObj.save(function() {
			// Try deleting Kropotkin
			request(app).delete('/kropotkins/' + kropotkinObj._id)
			.expect(401)
			.end(function(kropotkinDeleteErr, kropotkinDeleteRes) {
				// Set message assertion
				(kropotkinDeleteRes.body.message).should.match('User is not logged in');

				// Handle Kropotkin error error
				done(kropotkinDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Kropotkin.remove().exec();
		done();
	});
});