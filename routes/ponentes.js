var express = require('express');
var router = express.Router();
var Ponente = require('../models').Ponente

/* GET users listing. */
router.get('/', function(req, res, next) {
  Ponente.find(function(err, ponentes) {
  	// res.send(ponentes)
  	// res.render('ponentes', ponentes);
  	res.render('ponentes', { data: ponentes, title: "Ponentes" });
  })
});
module.exports = router;