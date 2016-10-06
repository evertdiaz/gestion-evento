var mongoose = require('mongoose')

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

var asistenteSchema = new Schema({
	nombres: String,
	apellidos: String,
	dni: Number,
	cel: Number,
	pago: Boolean
})
mongoose.model('asistentes', asistenteSchema)

var Asistente = mongoose.model('asistentes')

module.exports.User = User
module.exports.Asistente = Asistente