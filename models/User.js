const mongoose = requie("mongoose")

const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	id:{
		type: Integer,
		required: true
	},
	correo:{
		type: String,
		required: true
	},
	rol:{
		type: String,
		required: true
	}
})

module.exports = mongoose.model("User", userSchema)