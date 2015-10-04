var Machine = require('../models/machine').Machine;

var verifyData = function(parsedDataArray) {
    //  0:length
    //  1:length
    //  2: FrameType
    //  3: Address(8byte)
    //  4: Address(8byte)
    //  5: Address(8byte)
    //  6: Address(8byte)
    //  7: Address(8byte)
    //  8: Address(8byte)
    //  9: Address(8byte)
    // 10: Address(8byte)
    // 11: Address(2byte)
    // 12: Address(2byte)
    // 13: Receive Option - 1 
    // 14: Sample Number - 1
    // 15: Digital Mask - 0
    // 16: Digital Mask - 0
    // 17: Analog Mask - 8
    // 18: Analog Value 
    // 19: Analog Value 
    var address = parsedDataArray[7].toString() + parsedDataArray[8].toString() + parsedDataArray[9].toString() + parsedDataArray[10].toString();
    var digitalMask = parsedDataArray[15].toString() + parsedDataArray[16].toString();
    var analogMask = parsedDataArray[17].toString();
    var analogValue = parseInt(parsedDataArray[18], 16) * 256 + parseInt(parsedDataArray[19], 16);
    var valid = (digitalMask === "00") && (analogMask === "8");
    if (valid) {
        return {
            machineId: address,
            currentValue: analogValue,
            valid: true
        }
    } else {
        return {
            valid: false
        }
    }
}

exports.updateMachineStatus = function(io) {
    return function(req, next) {
        console.log("received:");
        console.log(req.query.current_value);
        var current_value_parsed = req.query.current_value.split(":");
        var verifiedResult = verifyData(current_value_parsed); 
        if (verifiedResult.valid) {
            var machine = new Machine({
                machine_id: verifiedResult.machineId,
                current_value: verifiedResult.currentValue
            });


            machine.save(function(err) {
                if (err) {
                    return next.send(err);
                }
                io.sockets.emit("updateMachineStatus", {
                    machine_id: verifiedResult.machineId,
                    current_value: verifiedResult.currentValue
                });
                return next.json({
                    message: 'Machine updated!'
                });
            })
        } else {
        	return next.send("invalid data");
        }
    }
};
