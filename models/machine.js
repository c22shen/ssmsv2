var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineschema = new Schema({
	machine_id: String,
	current_value: String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Machine = mongoose.model('Machine', machineschema);
module.exports = {
	Machine: Machine
};

