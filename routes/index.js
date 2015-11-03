var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');

module.exports = function(app, io) {
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Express'
        });
    });
    app.save('/avada', function(req, res) {
    	alert(req);
        // res.render('index', {
        //     title: 'Express'
        // });
    });
    app.put('/machines', MachineService.updateMachineStatus(io));
};
