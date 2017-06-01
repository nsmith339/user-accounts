var settings = require('../settings.js');
var User = require('../app.js');
var coMocha = require('co-mocha');	// Support for ES6 generators which Koa uses
var expect = require('chai').expect;	// Assertion library to use
var rewire = require('rewire');
var userRewire = rewire('../app.js');
var db = require('monk')(settings.mongo_test_uri)


describe('Test user.js', function*(){
	var collection;
	before(function*(){
		collection = db.get('emails');
	});
	describe('#addUser',function*(){
		var addUserFn;
		before(function(){
			addUserFn = userRewire.__get__('addUser');
		})

		it('test for new user', function*(done){
			var userDoc = {
				first_name: 'ivan',
				last_name: 'espinosa',
				email: 'iespinosa'
			};
			// stub
			// test to see if you call insert function
			var value = yield users.addUserFn(userDoc);
			var result = yield value();
			expect(result).to.equal(true);
			done();
		});
		it('test if user already exists', function*(done){
			var userDoc = {
				first_name: 'ivan',
				last_name: 'espinosa',
				email: 'iespinosa'
			};
			// stub
			// test to see if you call insert function
			var result = yield addUserFn(userDoc);
			expect(result).to.equal(false);
			done();
		});
	})
});
