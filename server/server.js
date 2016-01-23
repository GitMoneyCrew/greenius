var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var middleware = require('./config/middleware.js');
console.log('middle', typeof middleware);
middleware(app, express);

app.listen(port);
console.log('listening on ' + port);