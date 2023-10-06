const Room = require("../models/RoomCode");
const asyncHandler = require("express-async-handler");

//API para exponer el codigo para front

const postSymbol = asyncHandler(async (req, res) => {
  const { huaqueroSymbols } = req.body;

  // Assuming there's always only one RoomCode document you want to modify.
  const room = await Room.findOne(); // Adjust according to your actual logic to find the specific room.

  if (!room) return res.status(404).json({ message: "Room not found" });

  // Create a new symbol object and push it into the huaqueroSymbols array
  const newSymbol = {
    name: huaqueroSymbols.name,
    found: huaqueroSymbols.found,
  };

  room.huaqueroSymbols.push(newSymbol); // Push the new symbol into the huaqueroSymbols array
  await room.save();

  res
    .status(201)
    .json({ message: "Symbol added successfully", symbol: newSymbol });
});

const getRoomCode = asyncHandler(async (req, res) => {
  const room = await Room.find().select("-id").lean();
  //const room = await Room.findOne({});
  //.find().select("-id").lean();
  if (!room) {
    return res.status(400).json({ message: "no hay codigos de sala" });
  }
  res.json(room);
});

const updateSymbol = asyncHandler(async (req, res) => {
  const { symbolName, found } = req.body;

  try {
    // Find the room and symbol based on the symbolName
    const room = await Room.findOne({ "huaqueroSymbols.name": symbolName });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const symbol = room.huaqueroSymbols.find((s) => s.name === symbolName);
    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }

    // Update the "found" state of the symbol
    symbol.found = found;
    await room.save();

    res.json({ message: `Symbol ${symbolName} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = {
  postSymbol,
  getRoomCode,
  updateSymbol,
};
