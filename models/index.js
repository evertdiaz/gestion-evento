var mongoose = require('mongoose')

// Usuarios
var Schema = mongoose.Schema

var userSchema = new Schema({
	nombres: String,
	apellidos: String,
	dni: Number,
	username: String,
	password: String
})

mongoose.model('users', userSchema)

var User = mongoose.model('users')

// Asistente
var asistenteSchema = new Schema({
	nombres: String,
	apellidos: String,
	dni: Number,
	cel: Number,
	pago: Boolean
})
mongoose.model('asistentes', asistenteSchema)

var Asistente = mongoose.model('asistentes')

// Ponente
var ponenteSchema = new Schema({
	nombres: String,
	descripcion: String,
	img: String,
	facebook: String,
	twitter: String,
	linkedin: String
})

mongoose.model('ponentes', ponenteSchema)

var Ponente = mongoose.model('ponentes')

var temaSchema = new Schema({
	titulo: String,
	descripcion: String,
	etiqueta: String
})

mongoose.model('temas', temaSchema)

var Tema = mongoose.model('temas')

module.exports.User = User
module.exports.Asistente = Asistente
module.exports.Ponente = Ponente
module.exports.Tema = Tema