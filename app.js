//var settings = require('./settings.js');
//var mongo = require('monk')(settings.mongo_uri);
//var userColl = mongo.get('emails');
var co = require('co');
var users = require('./user.js');

var a_user = {
	first_name: 'ivan',
	last_name: 'espinosa',
	email: 'iespinosa'
};


// find
/*function* findUser(userDoc){
	return function*(){
		var result = yield userColl.find(userDoc);
		return result;
	}
};*/

// pre-testing
function getUser(userDoc)
{
	// retrieve data
	co(function*(){
		var value = yield users.findUser(a_user);
		var result = yield value();
		console.log(result[0]);
	}).then(function(){
			process.exit();
	}).catch(on_error);
}

function addUser(userDoc)
{
	// retrieve data
	co(function*(){
		var value = yield users.addUser(a_user);
		var result = yield value();
	}).then(function(){
			process.exit();
	}).catch(on_error);
}

addUser(a_user);

function removeUser(userDoc)
{
	// retrieve data
	co(function*(){
		var value = yield users.removeUser(a_user);
		var result = yield value();
		console.log(result);
	}).then(function(){
			process.exit();
	}).catch(on_error);
}

function isUser(userDoc)
{
	// retrieve data
	co(function*(){
		var value = yield users.isUser(a_user);
		console.log(value);
	}).then(function(){
			process.exit();
	}).catch(on_error);
}


// output caught error
function on_error(err) {
  	console.error(err.stack);
}