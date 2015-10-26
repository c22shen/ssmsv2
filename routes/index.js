var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');



// router.post('/saveStatus', function(req, res, next) {
//     // console.log(req);
//     console.log("saveStatus");
//     console.log(req.body);
//     // userService.addUser(req.body, function(err) {
//     //     if (err) {
//     //         console.log("user create error");
//     //     }

//     //     res.send(200);
//     // })
// });
// module.exports = router;

module.exports = function(app, io) {
    app.get('/', function(req, res) {
        // app = req.app;
        res.render('index', {
            title: 'Express'
        });
    });
    app.put('/machines', MachineService.updateMachineStatus(io));



    // app.post('/saveStatus', function(req, res, next) {
    //     console.log("save Status checked");
    //     console.log(req.body);
    //     console.log("****************BODY*****************");
    //     console.log(req.query);
    //     console.log("****************QUERY*****************");

    //     // console.log(req)
    //     console.log("**********");
    //     res.sendStatus(200);
    // })



    // MachineService.storeMachineStatus();


    // router.post('/create', function(req, res, next) {
    //     // console.log(req);
    //     userService.addUser(req.body, function(err) {
    //         if (err) {
    //             console.log("user create error");
    //         }

    //         res.send(200);
    //     })


    // });

};
