var Machine = require('../models/machine').Machine;
var Position = require('../models/position').Position;
var mongoose = require('mongoose');
//     //  0:length
//     //  1:length
//     //  2: FrameType
//     //  3: Address(8byte)
//     //  4: Address(8byte)
//     //  5: Address(8byte)
//     //  6: Address(8byte)
//     //  7: Address(8byte)
//     //  8: Address(8byte)
//     //  9: Address(8byte)
//     // 10: Address(8byte)
//     // 11: Address(2byte)
//     // 12: Address(2byte)
//     // 13: Receive Option - 1 
//     // 14: Sample Number - 1
//     // 15: Digital Mask - 0
//     // 16: Digital Mask - 0
//     // 17: Analog Mask - 8
//     // 18: Analog Value 
//     // 19: Analog Value 



var getNewStatus = function(machineId, status) {
    var newMachineStatus;
    if (machineId === "lathe1") {
        newMachineStatus = new Lathe1({
            machineId: req.body.machineId,
            status: req.body.status
        })
    } else if (machineId === "milling1") {
        newMachineStatus = new Milling1({
            machineId: req.body.machineId,
            status: req.body.status
        })
    } else {
        console.log("ERROR! machineId doesn't match");
    }

    return newMachineStatus;
}

exports.storeMachineStatus = function() {
    return function(req, res, next) {

        var newMachineStatus = getNewStatus(req.body.machineId, req.body.status)

        newMachineStatus.save(function(err) {
            if (err) {
                console.log("storeMachineStatus error", err);
            } else {
                console.log("--------machineservice successful");
            }
        })
    }
}

exports.updateMachineStatus = function() {
    return function(req, next) {
        var current_value_parsed = req.query.current_value.split(":");
        current_value = parseInt(current_value_parsed[1], 16) * 256 + parseInt(current_value_parsed[2], 16);
        io.sockets.emit("updateMachineStatus", {
            machine_id: current_value_parsed[0],
            current_value: current_value
        });
        return next.json({
            message: 'Machine updated received'
        });

    }
}

exports.storeMachinePosition = function() {
    return function(req, res, next) {
        var newMachinePosition = new Position({
            machineId: req.body.machineId,
            x_pos: req.body.x_pos,
            y_pos: req.body.y_pos
        });
        newMachinePosition.save(function(err) {
            if (err) {
                return res.send(err);
            }

            return res.json({
                message: 'Machine Position updated!'
            });
        })
    }
}

exports.getMachinePositions = function() {
    Position.find({}, function(err, positions) {
        if (err) {
            console.logs("getMachinePositions", err);
        } else {
            return positions;
        }
    })
}
