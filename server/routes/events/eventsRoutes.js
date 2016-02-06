var eventsHandler = require('./eventsHandler.js');

module.exports = function(app){
  app.post('/addPlantEvent', eventsHandler.addPlantEvent);
  app.post('/getPlantEvent', eventsHandler.getPlantEvent);
  app.post('/getUserEvents', eventsHandler.getUserEvents);
  app.post('/sendPlantMail', eventsHandler.sendPlantMail);
  app.post('/removePlantEvent', eventsHandler.removePlantEvent);
  app.post('/removeAllPlantEvents', eventsHandler.removeAllPlantEvents);
};
