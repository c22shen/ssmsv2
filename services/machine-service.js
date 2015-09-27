var Machine = require('../models/machine').Machine;

exports.updateMachineStatus = function(io) {
    return function(req, next) {

        var machine = new Machine({
            machine_id: req.params.machine_id,
            current_value: req.query.current_value
        });


        machine.save(function(err) {
            if (err) {
                return next.send(err);
            }
            io.sockets.emit("updateMachineStatus", {
                machine_id: req.params.machine_id,
                current_value: req.query.current_value
            });
            console.log("message emitted");
            return next.json({ message: 'Machine updated!' });
        })
    }
};
