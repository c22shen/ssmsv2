var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;