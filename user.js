var settings = require('./settings.js');
const mongo_uri = settings.mongo_uri;			
const collection = settings.mongo_collection;
var mongo = require('monk')(settings.mongo_test_uri);
var userColl = mongo.get('emails');



// get document in database
function* findUser(userDoc){
	return function*(){
		var user = yield userColl.find(userDoc);
		if (user[0] == undefined) return false;
		return user;
	}
};

// add document to database
function* addUser(userDoc){
	return function*(){
		// find if user is in database already
		var user = yield userColl.find(userDoc);
		// user not found
		if (user[0] != undefined) return false;
		result = yield userColl.insert(userDoc);
		return true;
	}
};


// remove document from database
function* removeUser(userDoc){
	return function*(){
		var user = yield userColl.find(userDoc);
		// no user exists
		if (user[0] == undefined) return false;
		result = yield userColl.remove(userDoc);
		// success in removal
		if (result.result.ok == 1) return true;
	}
};

// boolean is in database
function* isUser(userDoc) {
	var user = yield userColl.find(userDoc);
	// user is found
	if (user[0] != undefined) return true;
	return false;
}	



module.exports = {
	findUser : findUser,
	addUser : addUser,
	removeUser : removeUser,
	isUser : isUser
};