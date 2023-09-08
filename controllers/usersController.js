const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")

//descripcion: GET all users
//ruta: GET /users
//acceso: privado
const getAllUsers = asyncHandler(async(req, res) =>{
	//llamamos a la base de mongo, que nos pase usuarios sin recibir toda la info de como
	//manjear datos usando "lean"
	//el select es para que no nos pase ese dato
	const users = await User.find().select("-id").lean();
	if(!users){
		return res.status(400).json({message: "no hay usuarios"})
	}
	res.json(users);
})

//descripcion: Create new user
//ruta: POST /users
//acceso: privado
const createNewUser = asyncHandler(async(req, res) =>{
	const {username, id, rol, correo}

	//comprobacion que no son campos vacios
	if(!username || !id || !rol){
		return.res.status(400).json)({message: "Todos los campos son requeridos"});
	}

	//EN CASO QUE QUERAMOS EVITAR DUPLICADOS
	//const duplicate = await User.findOne({ id }).lean().exec()
	//if(duplicate){
	//	return res.status(409).json({Mensaje: "usuario duplicado"})
	//}

	//Encriptacion
	const hashedName = await bcrypt.hash(username, 10)//salt rounds

	const userObject = {"username": hashedName, id, rol, correo}

	//crear y guardar nuevo usuario
	const user = await User.create(userObject);

	if(user){
		res.status(201).json({message: `Nuevo usuario ${id} creado`})
	}else{
		res.status(400).json({message: `No se ha ingresado el usuario ${id}`})
	}
})

module.exports = {
	getAllUsers,
	createNewUser
}