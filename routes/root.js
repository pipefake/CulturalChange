const express = require("express")
const router = express.Router()
const path = require("path")

//router.get("^/$|/index(.html)?", (req,res) => {
router.get("^/$|/index(.html)", (req,res) => {
	res.sendFile(path.join(__dirname, "src", "index.html"));
})

//TEST
//enrutameinto TEMPORAL
//router.get("/", (req,res) => {
//	res.redirect(301, "http://localhost:3000");
//})

module.exports = router