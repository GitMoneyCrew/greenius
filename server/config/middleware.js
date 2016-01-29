var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

if(!process.env.DEPLOYED) {
	var config = require('./../env/config.js');	
}

module.exports = function(app, express){

  var jwtCheck = jwt({
    secret: new Buffer( process.env.AUTH0_CLIENT_SECRET || config.AUTH0_CLIENT_SECRET),
    audience: '909iKBxjdoJbblSUwtwFKFwfkqZss09d'
  });

	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + './../../client'));

	var plantsRouter = express.Router();
	var usersRouter = express.Router();

	app.use('/api/plants', plantsRouter);
	app.use('/api/users', usersRouter);

	require('./../routes/plants/plantsRoutes.js', jwtCheck)(plantsRouter);
	require('./../routes/users/usersRoutes.js')(usersRouter);

};
