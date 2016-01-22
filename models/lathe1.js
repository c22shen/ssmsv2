var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineschema = new Schema({
	machineId: String,
	status: Boolean,
	created: {
		type: Date,
		default: Date.now
	}
});

var Lathe1 = mongoose.model('Lathe1', machineschema);
module.exports = {
	Lathe1: Lathe1
};

