var express = require('express');
var router = express.Router();
var ContactService = require('../services/contact-service');

router.post('/sendMailYun', ContactService.sendMailYunNM());

module.exports = router;
