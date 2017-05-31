var User = require('../app.js');
let chai = require('chai');
chai.should();
const expect = require('chai').expect;

describe('app', function() {  
    describe('#isUser()', function() {
    	let a_user = {
    		"first_name": "ASDF",
    		"last_name": "FDAS",
    		"email": "DSADF@email.com"
    	};
    	var newUser;
    	before( () => {
	    	newUser = new User(a_user);
    	});

        it('#should see if user is not in database', function() {
        	result = newUser.isUser;
        	result.then((res) => {
        		expect(res).to.be.equal(true);
        	})
        	

            
        });
    });
});