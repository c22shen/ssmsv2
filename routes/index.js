var express = require('express');
var router = express.Router();
var MachineService = require('../services/machine-service');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


router.route('/machines/:machine_id')

// // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
// .get(function(req, res) {
//     ...
// })

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
.put(function(req, res) {
	MachineService.updateMachineStatus(req, function(err){
		if (err){
			// res.send(err);
			res.json({ message: 'Machine failed' });
		} else {
			res.json({ message: 'Machine updated!' });
		}
	})
});


module.exports = router;
