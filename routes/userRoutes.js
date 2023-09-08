const express = require("express")
const router = express.Router()
//llamando al controlador
const {getAllUsers, createNewUser } = require("../")

router.route("/")
	.get(getAllUsers)
	.post(createNewUser)

module.exports = router