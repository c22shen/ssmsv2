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

var Milling1 = mongoose.model('Milling1', machineschema);
module.exports = {
	Milling1: Milling1
};

