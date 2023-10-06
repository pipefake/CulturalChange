//variables que no queremos en el git
require("dotenv").config()
const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
//traemos cors para que google nos pueda hacer fetch
const cors = require('cors');
//importando el modulo creado
//para hacer un log de eventos
const { logger } = require("./middleware/logEvents");
//errores personalizados y su log
//no tiene {} porque ese archivo tiene un import de logger y se hace patata
const errorHandler = require("./middleware/errorHandler");
//para hacer parse a galletas
const cookieParser = require("cookie-parser")
//llamando a la carpeta de origenes permitidos para enviar a cors la lista
const corsOptions = require("./config/corsOptions")
//conexion a base de datos
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")

//====================================
//PRUEBAS CODIGO QR
const cron = require("node-cron");
const RoomCode = require("./models/RoomCode");

const generateRoomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

cron.schedule("*/30 * * * *", async () => {
    const newCode = generateRoomCode();
    console.log(`Generated new room code: ${newCode}`);
    try {
        // Update the current room code in the RoomCode collection
        let roomCodeEntry = await RoomCode.findOne();
        if (roomCodeEntry) {
            roomCodeEntry.huaqueroSymbols = [];
            roomCodeEntry.code = newCode;
            roomCodeEntry.updatedAt = Date.now();
            await roomCodeEntry.save();
        } else {
            await RoomCode.create({ code: newCode });
        }

    } catch (error) {
        console.error("Error updating room codes:", error);
    }
});
//====================================

//conexion base de datos
connectDB();

//--------------------------------------------
//agregando midwares, cosas que estan entre peticion y respuesta

//un log de eventos, para eso usamos la carpeta
//middleware y el archivo logEvents, llamando solo a logger que llama a log event
app.use(logger);

//cors con lista de permitidos
//Cross Origin Resource Sharing
//app.use(cors(corsOptions));
app.use(cors());

//sacar cosas de url
app.use(express.urlencoded({ extended: false }));

//nos permite sacar json de las respuestas
app.use(express.json());

//nos permite hacer parse a galletas
app.use(cookieParser());

//para mostrar los archivos que esten en carpeta publica a express, diciendole
//que son archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//==============
app.use("/", require("./routes/root"));
//enrutando a un html para usuarios
app.use("/users", require("./routes/userRoutes"))
//enrutando para darme el codigo de la sala
app.use("/roomCode", require("./routes/roomCodeRoutes"))
//==============

//rutas a manifiesto y favicon
app.get("^/$|/favicon.ico", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "favicon.ico"));
})

app.get("^/$|/manifest.json", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "manifest.json"));
})

app.get("^/$|/react192.png", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "react192.png"));
})

app.get("^/$|/react512.png", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "react512.png"));
})
//=============

//para todos los casos que no se cumplan, llevame a 404 personalizado
//cambiamos app.get("/*",)
//a all, esto permite que todo (incluso middleware) obtenga el erro 404
//los if es para ver que tipo de archivo pidi�
//y le respondemos 404 dependiendo el tipo
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

//error personalizado sobre CORS denegando acceso
//recibe peticion y error y devuelve 500 con texto de error personalizado arriba
//la logica de la funcion esta en middleware en 
app.use(errorHandler);

//escuchamos el evento de abiero (la conexion a la bd)
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

//catch errores en conexion
mongoose.connection.on("error", err => {
    console.log(err);
    logger(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, `mongoErrLog.log`)
})