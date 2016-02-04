var eventsHandler = require('./eventsHandler.js');

module.exports = function(app){
  app.post('/addPlantEvent', eventsHandler.addPlantEvent);
  app.post('/getPlantEvent', eventsHandler.getPlantEvent);
  app.post('/getUserEvents', eventsHandler.getUserEvents);
  app.post('/postToGoogleCalendar', eventsHandler.postToGoogleCalendar);
  app.post('/removePlantEvent', eventsHandler.removePlantEvent);
};
