'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Kropotkin = mongoose.model('Kropotkin');

/**
 * Globals
 */
var user, kropotkin;

/**
 * Unit tests
 */
describe('Kropotkin Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			kropotkin = new Kropotkin({
				name: 'Kropotkin Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return kropotkin.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			kropotkin.name = '';

			return kropotkin.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Kropotkin.remove().exec();
		User.remove().exec();

		done();
	});
});