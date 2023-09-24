const User = require("../models/User");
const asyncHandler = require("express-async-handler");
//const bcrypt = require("bcrypt")
const CryptoJS = require('crypto-js');

//descripcion: GET all users
//ruta: GET /users
//acceso: privado
const getAllUsers = asyncHandler(async (req, res) => {
	//llamamos a la base de mongo, que nos pase usuarios sin recibir toda la info de como
	//manjear datos usando "lean"
	//el select es para que no nos pase ese dato
	const users = await User.find().select("-id").lean();
	if (!users) {
		return res.status(400).json({ message: "no hay usuarios" })
	}
	res.json(users);
})

//descripcion: Create new user
//ruta: POST /users
//acceso: privado
const createNewUser = asyncHandler(async (req, res) => {
	const { name, identification, email, rol, finalizadaTarea, tipoUsuario, codigoSala } = req.body

	//comprobacion que no son campos vacios
	if (!name || !identification || !email || !rol || !finalizadaTarea || !tipoUsuario || !codigoSala) {
		return res.status(400).json({ message: `Todos los campos son requeridos: ${name} ${identification} ${email} ${rol} ${finalizadaTarea} ${tipoUsuario} ${codigoSala}` });
	}

	//EN CASO QUE QUERAMOS EVITAR DUPLICADOS
	//const duplicate = await User.findOne({ id }).lean().exec()
	//if(duplicate){
	//	return res.status(409).json({Mensaje: "usuario duplicado"})
	//}

	//Encriptacion antigua (mal)
	//const hashedName = await bcrypt.hash(username, 10)//salt rounds

	//Encriptando todos los parametros
	const secretKey = '$2b$10$tV5AHXrk3pZymfGihPI4T.S8Sxx12aWfNpyQTAt.QA029.HQqJMcy';
	const encryptedUsername = CryptoJS.AES.encrypt(name, secretKey).toString();
	const encryptedIdentificacion = CryptoJS.AES.encrypt(identification.toString(), secretKey).toString();
	const encryptedCorreo = CryptoJS.AES.encrypt(email, secretKey).toString();
	const encryptedRol = CryptoJS.AES.encrypt(rol, secretKey).toString();

	const userObject = { "name": encryptedUsername, "identification": encryptedIdentificacion, "email": encryptedCorreo, "rol": encryptedRol, finalizadaTarea, tipoUsuario, codigoSala }

	//crear y guardar nuevo usuario
	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({ message: `Nuevo usuario ${identification} creado` })
	} else {
		res.status(400).json({ message: `No se ha ingresado el usuario ${identification}` })
	}
})

//descripcion: update user
//ruta: POST /users
//acceso: privado
const updateUser = asyncHandler(async (req, res) => {
	//lamo informacion del body
	const { _id, username, identificacion, correo, rol, finalizadaTarea, tipoUsuario, codigoSala } = req.body;

	//confirmando campos no vacios
	if (!username || !identificacion || !correo || !rol || !finalizadaTarea || !tipoUsuario || !codigoSala) {
		return res.status(400).json({ message: `Todos los campos son requeridos: ${_id} ${username} ${identificacion} ${correo} ${rol} ${finalizadaTarea} ${tipoUsuario} ${codigoSala}` });
	}

	//toca modificar un solo usuario, asi que llamemos por su id
	const user = await User.findById(_id).exec();

	//si no lo encontramos
	if (!user) {
		return res.status(400).json({ message: "Usuario no encontrado" })
	}

	//estan comentadas
	//lineas de codigo para {evitar duplicados} en base de datos
	//const duplicado = await User.findOne({username}).lean().exect();
	//if(duplicate && duplicate?._id.toString() !== id){
	//	return res.status(400).json({message "usuario duplicado"})
	//}

	//modificarlo
	//hash id
	//hash id
	//user.username = await bcrypt.hash(username, 10) //10 es sales
	//encriptando informacion a modificar
	const secretKey = '$2b$10$tV5AHXrk3pZymfGihPI4T.S8Sxx12aWfNpyQTAt.QA029.HQqJMcy';
	user.username = CryptoJS.AES.encrypt(username, secretKey).toString();
	user.identificacion = CryptoJS.AES.encrypt(identificacion, secretKey).toString();
	user.correo = CryptoJS.AES.encrypt(correo, secretKey).toString();
	user.rol = CryptoJS.AES.encrypt(rol, secretKey).toString();
	user.finalizadaTarea = finalizadaTarea;
	user.tipoUsuario = tipoUsuario;
	user.codigoSala = codigoSala;

	//actualizar
	const updateUser = await user.save();

	//respuesta
	res.json({ message: `Se actualiz�: ${updateUser.username} ${updateUser.identificacion}` });
})

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser
}