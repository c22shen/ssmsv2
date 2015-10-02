
var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');


module.exports = function(app, io) {
    app.get('/', function(req, res) {
        // app = req.app;
        res.render('index', {
            title: 'Express'
        });
    });
    app.put('/machines', MachineService.updateMachineStatus(io));
};

