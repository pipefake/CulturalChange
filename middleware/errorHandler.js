const { logEvents} = require ("./logEvents");
//traemos el log events, porque haremos log tambien de errores

const errorHandler = (err,req,res,next) => {
	logEvents(`${err.name}: ${err.message}\t${req.method}
	\t${req.url}\t${req.headers.origin}`, `errLog.txt`);	
	console.error(err.stack);

	const status = res.statusCode ? res.statusCode: 500 //error server
	res.status(status);

	res.json({message: err.message})
}

module.exports = errorHandler;