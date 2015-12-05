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

var Machine = mongoose.model('Machine', machineschema);
module.exports = {
	Machine: Machine
};

