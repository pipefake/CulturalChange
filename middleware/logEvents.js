const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, ".." , 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, ".." , 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, ".." , 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

//funcion para llamar y hacer el registro
const logger = ((req,res,next)=>{
	//que metodo se usa, quien lo usa y el archivo que pide, nombre archivo de log a crear
	//logEvents(`${req.method} \t ${req.headers} \t ${req.path}`, "reqLog.txt");
    logEvents(`${req.method} \t ${req.headers.origin} \t ${req.path}`, "reqLog.txt");
	console.log(`${req.method} ${req.path}`);
	next();
});

module.exports = {logger, logEvents};
