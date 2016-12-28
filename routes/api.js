var express = require('express')
var router = express.Router()
var Asistente = require('../models').Asistente
var Ponente = require('../models').Ponente

router.post('/registro', function(req, res, next) {
	console.log(req.body)
	var nombres = req.body.nombres
	var apellidos = req.body.apellidos
	var dni = req.body.dni
	var cel = req.body.cel
	var pago = req.body.pago

	var newAsistente = new Asistente()
	newAsistente.nombres = nombres
	newAsistente.apellidos = apellidos
	newAsistente.dni = dni
	newAsistente.cel = cel
	newAsistente.pago = pago
	newAsistente.save(function(err, savedAsistente) {
		if(err) {
			console.log(err)
			return res.status(500).send()
		}
		return res.status(200).send()
	})

})

router.post('/ponente', function(req, res, next) {
	console.log(req.body)
	var nombres = req.body.nombres
	var descripcion = req.body.descripcion
	var img = req.body.img
	var facebook = req.body.facebook
	var twitter = req.body.twitter
	var linkedin = req.body.linkedin

	var newPonente = new Ponente()
	newPonente.nombres = nombres
	newPonente.descripcion = descripcion
	newPonente.img = img
	newPonente.facebook = facebook
	newPonente.twitter = twitter
	newPonente.linkedin = linkedin
	newPonente.save(function(err, savedPonente) {
		if(err) {
			console.log(err)
			return res.status(500).send()
		}
		return res.status(200).send()
	})

})

module.exports =  router