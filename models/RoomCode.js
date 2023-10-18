// roomCode.model.js
const mongoose = require( "mongoose");

const roomCodeSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
	huaqueroSymbols: [
		{
		  name: {
			type: String,
			required: true
		  },
		  found: {
			type: Boolean,
			default: false,
			required: true
		  }
		}
	  ]
})

module.exports = mongoose.model("RoomCode", roomCodeSchema)