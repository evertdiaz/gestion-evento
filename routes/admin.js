var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
	res.render('admin', {title: "Administración"})
})

router.get('/cms', function(req, res, next) {
	res.render('cms', {title: "Contenidos"})
})

router.get('/data', function(req, res, next) {
	res.render('data', {title: "Asistentes"})
})

module.exports =  router