var express = require('express')
var router = express.Router()
var Asistente = require('../models').Asistente

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

module.exports =  router