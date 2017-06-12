var settings = require('./settings.js');
const mongo_uri = settings.mongo_uri;			
const collection = settings.mongo_collection;
var mongo = require('monk')(settings.mongo_test_uri);
var userColl = mongo.get('emails');



// get document in database
function findUser(userDoc){
	return function*(){
		var user = yield userColl.find(userDoc);
		if (user[0] == undefined) return false;
		return user;
	}
};

// add document to database
function addUser(userDoc){
	return function*(){
		// find if user is in database already
		var user = yield userColl.find(userDoc);
		console.log("user", user[0]);
		// user not found
		if (user[0] != undefined) return false;

		var result = yield userColl.insert(userDoc);
		console.log("result", result);
		if (result != undefined) return true;
		else return Error;
	}
};


// remove document from database
function removeUser(userDoc){
	return function*(){
		var user = yield userColl.find(userDoc);
		// no user exists
		if (user[0] == undefined) return false;
		result = yield userColl.remove(userDoc);
		// success in removal
		if (result.result.ok == 1) return true;
	}
};


module.exports = {
	findUser : findUser,
	addUser : addUser,
	removeUser : removeUser
};