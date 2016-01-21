var express = require('express');
var router = express.Router();
var ContactService = require('../services/contact-service');

router.post('/sendMail', ContactService.sendMail());

module.exports = router;
