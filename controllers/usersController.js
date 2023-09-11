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
	const {username, id, correo, rol, finalizadaTarea} = req.body

	//comprobacion que no son campos vacios
	if(!username || !id || !correo ||!rol ||!finalizadaTarea){
		return res.status(400).json({message: `Todos los campos son requeridos: ${username} ${id} ${correo} ${rol} ${finalizadaTarea}`});
	}

	//EN CASO QUE QUERAMOS EVITAR DUPLICADOS
	//const duplicate = await User.findOne({ id }).lean().exec()
	//if(duplicate){
	//	return res.status(409).json({Mensaje: "usuario duplicado"})
	//}

	//Encriptacion
	const hashedName = await bcrypt.hash(username, 10)//salt rounds

	const userObject = {"username": hashedName, id, correo, rol, finalizadaTarea}

	//crear y guardar nuevo usuario
	const user = await User.create(userObject);

	if(user){
		res.status(201).json({message: `Nuevo usuario ${id} creado`})
	}else{
		res.status(400).json({message: `No se ha ingresado el usuario ${id}`})
	}
})

//descripcion: update user
//ruta: POST /users
//acceso: privado
const updateUser = asyncHandler(async(req, res) =>{
	//lamo informacion del body
	const {username, id, correo, rol, finalizadaTarea} = req.body;

	//confirmando campos no vacios
	if(!username || !id || !correo ||!rol ||!finalizadaTarea){
		return res.status(400).json({message: `Todos los campos son requeridos: ${username} ${id} ${correo} ${rol} ${finalizadaTarea}`});
	}

	//toca modificar un solo usuario, asi que llamemos por su id
	const user = await User.findById(id).exec();

	//si no lo encontramos
	if(!user){
		return res.status(400).json({message: "Usuario no encontrado"})
	}

	//estan comentadas
	//lineas de codigo para {evitar duplicados} en base de datos
	//const duplicado = await User.findOne({username}).lean().exect();
	//if(duplicate && duplicate?._id.toString() !== id){
	//	return res.status(400).json({message "usuario duplicado"})
	//}

	//modificarlo
	user.username = username;
	user.correo = correo;
	user.rol = rol;
	user.finalizadaTarea = finalizadaTarea;

	//hash id
	if(id){
		//hash id
		user.id = await bcrypt(id, 10) //10 es sales
	}

	//actualizar
	const updateUser = await user.save();

	//respuesta
	res.json({{message: `Se actualizó: ${updateUser.username}`}})
}

module.exports = {
	getAllUsers,
	createNewUser
}