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
	rol:{
		type: String,
		required: true
	},
	active:{
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("User", userSchema)