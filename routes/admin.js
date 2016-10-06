var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
	res.render('admin', {title: "Administración VEIM"})
})

router.get('/cms', function(req, res, next) {
	res.render('cms', {title: "VEIM Contenidos"})
})

router.get('/data', function(req, res, next) {
	res.render('data', {title: "VEIM Asistentes"})
})

module.exports =  router