var settings = require('../settings.js');
//var User = require('../app.js');
var mocha = require('mocha')			// Testing
var coMocha = require('co-mocha');		// Support for ES6 gener-ators which Koa uses
	coMocha(mocha);						// extend mocha
var expect = require('chai').expect;	// Assertion library to use
var chai = require('chai');
var rewire = require('rewire');
var userRewire = rewire('../user.js');
//var db = require('monk')(settings.mongo_test_uri);

var a_user = {
first_name: "ASDF",
last_name: "FDAS",
email: "DSADF@email.com"
};
var actual_user = {
first_name: "not-user",
last_name: "not-user",
email: "not-user"
};

var mongo = require('monk')(settings.mongo_test_uri);
var userColl = mongo.get('emails');

function printDB() {
	userColl.find({}, (err, res) => {
		console.log("DB:");
		if (err) console.log(err);
		console.log(res);
		mongo.close();
})
};

function clearDB() {
	userColl.remove({}, (err, res) => {
		if (err) console.log(err);
		mongo.close();
})
};
var AddUserFn = userRewire.__get__("addUser");
var RemoveUserFn = userRewire.__get__("removeUser");
var FindUserFn = userRewire.__get__("findUser");





describe('app', function() {
	// find user in db
    describe('#findUser()', function() {
    	beforeEach( () => {
    		clearDB();
    	})

        it('returns false if user is not in database', function* (done) {
        	var value = yield FindUserFn(actual_user);
        	expect(value).to.equal(false);
        	done();
        })

        it('returns the userDoc if user is in database', function* (done) {
        	// get info from db
        	var result = yield FindUserFn(a_user);
        	//console.log("user exists?", result);
        	// user not in db, we want to test for true:
        	// add user, test, userthen remove user
        	if (result == false) {
        		//console.log("temporarily adding user for test");
       			var value = yield AddUserFn(a_user);
       			//console.log("user added? ", value);
       			// this should be impossible
       			if (value == false){
       				console.log("Something went wrong: can't add user to database for test.")
       			}

       			// try again
       			result = yield FindUserFn(a_user);
        		expect(result[0].first_name).to.equal(a_user.first_name);
        		// remove user
        		value = yield RemoveUserFn(a_user);
        		//console.log("user removed? ", value);
        	}
        	else
    			expect(result[0].first_name).to.equal(a_user.first_name);
        	done();
        });
    });

    // add user to db
    describe('#addUser()', function() {
    	beforeEach( function* () {
    		// remove the test user if it's there
    		yield RemoveUserFn(a_user);
    	});

        it('returns true if addded a new user to database', function* (done) {
        	var result = yield AddUserFn(a_user);        	
        	expect(result).to.equal(true);
        	done();
        });


     

        it('returns false if user is in database already', function* (done) {
        	// add same document twice
        	var result = yield AddUserFn(a_user);
        	result = yield AddUserFn(a_user); // should return falsels
        	expect(result).to.equal(false);
        	done();
        });

        after(function* () {
        	// remove temp user
        	yield RemoveUserFn(a_user);
        });
    });

    // remove user from db
    describe('#removeUser()', function() {
    	beforeEach( function*() {
    		yield RemoveUserFn(a_user);
    	});

        it('returns true if a user was removed', function* (done) {
        	// add temporary user
        	yield AddUserFn(a_user);

        	// run test
        	var result = yield RemoveUserFn(a_user);
        	
        	expect(result).to.equal(true);
        	// remove temp user
        	yield RemoveUserFn(a_user);
        	done();
        });

        it('returns false if a user was not in db', function* (done) {
        	var result = yield RemoveUserFn(a_user);
        	expect(result).to.equal(false);
        	done();
        });

    });
});