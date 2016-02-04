var usersHandler = require('./usersHandler.js');

module.exports = function(app){
 app.post('/addUser', usersHandler.addUser);
 app.post('/getUser', usersHandler.getUser);
 app.post('/deleteUser', usersHandler.deleteUser);
};
