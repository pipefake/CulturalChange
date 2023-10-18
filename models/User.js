const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},
	identification: {
		type: String,
		required: true
	},
	email: {
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