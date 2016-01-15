var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');

router.post('/create', MachineService.storeMachineStatus());
router.put('/receive', MachineService.updateMachineStatus());
router.post('/position', MachineService.storeMachinePosition());
router.get('/positions', MachineService.getMachinePositions());
// console.log(io);

module.exports = router;
