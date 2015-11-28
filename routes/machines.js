var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');
// module.exports = function(app, io) {
//     app.get('/', function(req, res) {
//         res.render('index', {
//             title: 'Express'
//         });
//     });

router.post('/create', MachineService.storeMachineStatus());

module.exports = router;
