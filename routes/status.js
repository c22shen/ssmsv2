var express = require('express');
var router = express.Router();

// var MachineService = require('../services/machine-service');



router.post('/update', function(req, res, next) {
    console.log("req.body");
    console.log(req.body);
    res.send(200);

    // console.log(req);
    // userService.addUser(req.body, function(err) {
    //     if (err) {
    //         console.log("user create error");
    //     }

    //     res.send(200);
    // })


});


module.exports = router;