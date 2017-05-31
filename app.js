const location = 'mongodb:27017/accounts' // location of db
const mongo = require('monk')(location); // mongodb object
var collection = mongo.get('emails');	// collection object
//var addAccounts = require('./add_accounts.js').init();

class User {
	constructor (userinfo) {
		this.userDoc = { 'email': userinfo.email,
						 'first_name': userinfo.first_name,
						 'last_name': userinfo.last_name
					     };
		this.userID = 0;
		this.addUser();
	};


	// Called in constructor
	// Adds user to database if they aren't in it yet.
	// Uses promise returned from finduser and checks it
	addUser(){
		this.findUser().then((record) => {
			// user not found
			if (record[0] == undefined) {
				console.log('Adding new user "%s %s" to db.', this.userDoc.first_name, this.userDoc.last_name);
				collection.insert(this.userDoc, (err, res) => {
					if (err) { console.log('ADD USER:\nAn error has occurred:\n', err); }
					else { 
						if (res[0] != undefined)
							this.userID = res[0]._id; 
					}
					mongo.close();
				});
			}
			
		});
	};

	// Finds user in database
	// Returns: promise to user in database for other functions
	findUser(){
		return collection.find(this.userDoc, (err, res) => {
			if (err) { console.log('FIND USER:\nAn error has occurred:\n', err); }
		});
	};
	
	// Prints the user from database
	printUser() {
		this.findUser().then((record) => { 
			if (record[0] != undefined){
				collection.remove(this.userDoc, (err, res) => {
					console.log('USER INFO:\n',record[0]);
				});
			}
			else {
				console.log('Could not print user: user does not exist.');
			} 
			mongo.close();
		});
	}

	// Removes user from database
	removeUser() {
		this.findUser().then((record) => {
			if (record[0] != undefined){
				collection.remove(this.userDoc, (err, res) => {
					console.log('User "%s %s" removed from db.', this.userDoc.first_name, this.userDoc.last_name);
				});
			}
			else {
				console.log('Could not remove user: user does not exist.');
			} 
			mongo.close();
		});
	};

	// Tells console if user is in database
	get isUser() {
		return this.findUser().then((record) => {
			if (record[0] != undefined) {
				console.log('User "%s %s" is in db.', this.userDoc.first_name, this.userDoc.last_name);
				mongo.close();
				return true;
			}
			else {
				console.log('User "%s %s" is not in db.', this.userDoc.first_name, this.userDoc.last_name);
				mongo.close();
				return false;
			}
			
		});
	}
};

module.exports = User;

/*var someUser = {
		'email': 'Lorem@consequat.org',
		'first_name': 'George',
		'last_name': 'Norman' };

var user = new User(someUser);
user.printUser();*/



/*var severalUsers = [
		{ 'first_name': 'Testy1',
		  'last_name': 'Testerson1',
		  'email': 'testEmail@email1' },

		{ 'first_name': 'Testy2',
	      'last_name': 'Testerson2',
		  'email': 'testEmail@email2' } ];*/


/*
// sorts by first name, then prints db 
collection.find({},{sort: {'first_name': 1}}, (err, res) => {
	console.log(res);
	mongo.close();
});
*/


