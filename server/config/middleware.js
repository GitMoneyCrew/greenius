var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + './../../client'));

	var plantsRouter = express.Router();
	var usersRouter = express.Router();

	app.use('/api/plants', plantsRouter);
	app.use('/api/users', usersRouter);

	require('./../routes/plants/plantsRoutes.js')(plantsRouter);
	require('./../routes/users/usersRoutes.js')(usersRouter);


};