var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	created: {
		type: Date,
		default: Date.now
	}
});

var User = mongoose.model('User', userschema);
module.exports = {
	User: User
};

