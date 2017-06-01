var settings = require('../settings.js');
var User = require('../app.js');
var mocha = require('mocha')			// Testing
var coMocha = require('co-mocha');		// Support for ES6 gener-ators which Koa uses
	coMocha(mocha);						// extend mocha
var expect = require('chai').expect;	// Assertion library to use
var rewire = require('rewire');
var userRewire = rewire('../app.js');
var db = require('monk')(settings.mongo_test_uri)


describe('Test of user.js', function* () {
	describe('#addUser', function* () {
		beforeEach(function(done){
				let userDoc = {
				first_name: 'nathan',
				last_name: 'smith',
				email: "nsmith@zam.com"
				};
		});

		it('should add a user to database', function(done) {
				expect(2).to.be.equal(2)
      	});
	});
});