var express = require('express');
var router = express.Router();
var Asistente = require('../models').Asistente

/* GET users listing. */
router.get('/', function(req, res, next) {
  Asistente.find(function(err, asistentes) {
  	res.send(asistentes)
  })
});

router.get('/:dni', function(req, res, next) {
  Asistente.find({dni: req.params.dni}, function(err, asistentes) {
  	if (JSON.stringify(asistentes) != '[]'){
			console.log(asistentes)
			res.send(asistentes)
		}
		else{
			res.send('no_data')
		}
  })
});

module.exports = router;
