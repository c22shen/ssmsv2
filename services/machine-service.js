var Machine = require('../models/machine').Machine;

exports.updateMachineStatus = function(req, next) {
	// console.log(req.body);
	var machine = new Machine({
		machine_id: req.params.machine_id,
		current_value: req.query.current_value
	});


	machine.save(function(err){
		if (err) {
			return next(err);
		}
		next(null);
	})
};


