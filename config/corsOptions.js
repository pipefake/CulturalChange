const allowedOrigins = require("./allowedOrigins")

//en pocas palabras revisamos si el origen (quien hace la peticion) diferente al primer origen
//cosas de notacion de node en su funcion, lo se es raro
//si el origen esta en los indices del arreglo, le devolvemos null=error, 
//true es decir "si es el mismo origen, dejalo pasar"

//IMPORTANTE, despues de desarrollar se borra || !origin

const corsOptions = {
	origin: (origin, callback) => {
		if(allowedOrigins.indexOf(origin) !== -1 || !origin){
			callback(null, true);
		}else{
			callback(new Error("Denegado por CORS"));
		}
	},
	optionsSuccessStatus: 200
}

module.exports = corsOptions