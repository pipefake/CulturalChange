const express = require("express")
const router = express.Router()

const roomController = require('../controllers/codigoSalaController')

router.route('/')
    .get(roomController.getRoomCode)

module.exports = router