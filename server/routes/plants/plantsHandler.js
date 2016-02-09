var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

module.exports = {
  deleteGarden: function(req, res) {
    var gardenData = req.body;
    helper.deleteGarden(gardenData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  deletePlant: function(req, res) {
    var plantData = req.body;
    helper.deletePlant(plantData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  addPlants: function(req, res) {
    var plantData = req.body;
    helper.addPlant(plantData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  addGarden: function(req, res) {
    var gardenData = req.body;
    var userData = req.body;
    helper.addGarden(gardenData)
      .then(function(results) {
        helper.addUserToGarden(gardenData, userData)
          .then(function(results) {
            res.status(200).send(results);
          })
          .catch(function(error) {
            console.log(error);
            res.status(404).send(error);
          });
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });

  },

  addGardenToPlant: function(req, res) {
    var garden = req.body.garden;
    var plant  = req.body.plant;
    helper.addGardenToPlant(plant, garden)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getPlantsForAUser: function(req, res) {
    var userData = req.body;
    helper.getUserPlants(userData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getSpecieInfo: function(req, res) {
    var specieData = req.body;
    helper.getSpeciesInfo(specieData)
      .then(function(results) {
        res.status(200).send(results.dataValues);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getPlant: function(req, res) {
    var plantData = req.body;
    helper.getPlantByNickname(plantData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getPlantById : function(req, res) {
    var plantData = req.body;
    helper.getPlantById(plantData)
      .then(function(results){
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getUserGardens: function(req, res) {
    var userData = req.body;
    helper.getGardensFromUser(userData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },
  getGardenPlants: function(req, res) {
    var gardenData = req.body;
    helper.getGardenPlants(gardenData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getSpecieInfoById: function(req, res) {
    var idData = req.body;
    helper.getSpecieInfoById(idData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  }
}
