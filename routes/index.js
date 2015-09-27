var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


router.route('/machines')

// create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {

    var machine = new Machine(); // create a new instance of the Bear model
    machine.status = req.body.status; // set the bears name (comes from the request)

    // save the bear and check for errors
    machine.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Bear created!'
        });
    });

})

// get all the bears (accessed at GET http://localhost:8080/api/bears)
.get(function(req, res) {
    Machine.find(function(err, machine) {
        if (err)
            res.send(err);

        res.json(machine);
    });
});

// router.route('/machines/:bear_id')

//     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function(req, res) {
//         Bear.findById(req.params.bear_id, function(err, bear) {
//             if (err)
//                 res.send(err);
//             res.json(bear);
//         });
//     });






module.exports = router;
