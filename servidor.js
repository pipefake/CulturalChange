const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
//traemos cors para que google nos pueda hacer fetch
const cors = require('cors');
//importando el modulo creado
//para hacer un log de eventos
const {logger} = require("./middleware/logEvents");
//errores personalizados y su log
//no tiene {} porque ese archivo tiene un import de logger y se hace patata
const errorHandler = require("./middleware/errorHandler");

//--------------------------------------------
//agregando midwares, cosas que estan entre peticion y respuesta

//un log de eventos, para eso usamos la carpeta
//middleware y el archivo logEvents, llamando solo a logger que llama a log event
app.use(logger);

//despues de hacer el log llamamos a cors

//vamos a hacer una whitelist 
const whitelist = ["https://www.google.com","http://127.0.0.1:5500", "http://localhost:3500", "http://localhost:3000"]

//en pocas palabras revisamos si el origen (quien hace la peticion) diferente al primer origen
//cosas de notacion de node en su funcion, lo se es raro
//si el origen esta en los indices del arreglo, le devolvemos null=error, 
//true es decir "si es el mismo origen, dejalo pasar"

//IMPORTANTE, despues de desarrollar se borra || !origin

const corsOptions = {
	origin: (origin, callback) => {
		if(whitelist.indexOf(origin) !== -1 || !origin){
			callback(null, true);
		}else{
			callback(new Error("Denegado por CORS"));
		}
	},
	optionsSuccessStatus: 200
}

//para activar la white list se descomenta esto y se quita la linea de abajo
app.use(cors(corsOptions));
//Cross Origin Resource Sharing
//app.use(cors());

//sacar cosas de url
app.use(express.urlencoded({extended: false}));

//nos permite sacar json de las respuestas
app.use(express.json());

//para mostrar los archivos que esten en carpeta publica
app.use(express.static(path.join(__dirname, "/public")));

//-----------------------------------------------------
//cuando el servidor reciba una peticion a raiz (/) le respondemos
//el archivo y encima le decimos la raiz en node

//magia de express, podemos decir
//^ inicia con eso
//$ finaliza con esto, | o es esta ruta
//(.html)? para decir que es opcional si pone la extension
app.get("^/$|/index(.html)?", (req,res)=>{
	//res.sendFile("./views/index.html",{root: __dirname});
	//forma alternativa
	res.sendFile(path.join(__dirname, "public", "index.html"));
})

//rutas a manifiesto y favicon
app.get("^/$|/favicon.ico", (req,res)=>{
	res.sendFile(path.join(__dirname, "public", "favicon.ico"));
})

app.get("^/$|/manifest.json", (req,res)=>{
	res.sendFile(path.join(__dirname, "public", "manifest.json"));
})

//=============

//llamando otra pagina
app.get("/new-page(.html)?", (req,res)=>{
	res.sendFile(path.join(__dirname, "views", "new-page.html"));
})

//redireccionando
app.get("/old-page(.html)?", (req,res)=>{
	res.redirect(301,"/new-page.html"); //302 por defecto, lo de 301 opcional
})

//para todos los casos que no se cumplan, llevame a 404 personalizado
//cambiamos app.get("/*",)
//a all, esto permite que todo (incluso middleware) obtenga el erro 404
//los if es para ver que tipo de archivo pidió
//y le respondemos 404 dependiendo el tipo
app.all("*", (req,res)=>{
	res.status(404);
	if(req.accepts("html")){
		res.sendFile(path.join(__dirname, "views", "404.html"));
	}
	else if(req.accepts("json")){
		res.json({error: "404 Not Found"});
	}else{
		res.type("txt").send("404 Not Found");
	}
});

//error personalizado sobre CORS denegando acceso
//recibe peticion y error y devuelve 500 con texto de error personalizado arriba
//la logica de la funcion esta en middleware en 
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));