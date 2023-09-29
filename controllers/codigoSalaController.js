const Room = require("../models/RoomCode");
const asyncHandler = require("express-async-handler");

//API para exponer el codigo para front

const getRoomCode = asyncHandler(async (req, res) => {
	const room = await Room.find().select("-id").lean();
	//const room = await Room.findOne({});
	//.find().select("-id").lean();
	if (!room) {
		return res.status(400).json({ message: "no hay codigos de sala" })
	}
	res.json(room);
})

module.exports = {
	getRoomCode
}