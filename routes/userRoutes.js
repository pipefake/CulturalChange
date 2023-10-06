const express = require("express");
const router = express.Router();

//llamando al controlador
//const {getAllUsers, createNewUser } = require("../controllers/userController")

//router.route("/")
//	.get(getAllUsers)
//	.post(createNewUser)

const usersController = require("../controllers/usersController");

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser);
module.exports = router;