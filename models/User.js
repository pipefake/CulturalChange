const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	identificacion: {
		type: String,
		required: true
	},
	correo: {
		type: String,
		required: true
	},
	rol: {
		type: String,
		required: true
	},
	finalizadaTarea: {
		type: Boolean,
		default: false,
		required: true
	},
	tipoUsuario: {
		type: String,
		required: true
	},
	codigoSala: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("User", userSchema)