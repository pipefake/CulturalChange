const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	id:{
		type: Number,
		required: true
	},
	correo:{
		type: String,
		required: true
	},
	rol:{
		type: String,
		required: true
	},
	finalizadaTarea:{
		type: Boolean,
		default: false,
		required: true
	}
})

module.exports = mongoose.model("User", userSchema)