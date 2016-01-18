var plantsHandler = require('./plantsHandler.js');

module.exports = function(app){
 app.post('/addPlant', plantsHandler.addPlant);
};
