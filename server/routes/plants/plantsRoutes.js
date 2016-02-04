 var plantsHandler = require('./plantsHandler.js');

 module.exports = function(app) {
   app.post('/addPlants', plantsHandler.addPlants);
   app.post('/addGarden', plantsHandler.addGarden);
   app.post('/addGardenToPlant', plantsHandler.addGardenToPlant);
   app.post('/loadPlants', plantsHandler.getPlantsForAUser);
   app.post('/loadSpecieInfo', plantsHandler.getSpecieInfo);
   app.post('/loadPlantInfo', plantsHandler.getPlant);
   app.post('/loadUserGardens', plantsHandler.getUserGardens);
   app.post('/loadGardenPlants', plantsHandler.getGardenPlants);
   app.post('/loadSpecieInfoById', plantsHandler.getSpecieInfoById);
   app.post('/deletePlant', plantsHandler.deletePlant);
   app.post('/deleteGarden', plantsHandler.deleteGarden);
 };
