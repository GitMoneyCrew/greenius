var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

module.exports = {
  deleteGarden: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE DELETEGARDEN');
    var gardenData = req.body;
    helper.deleteGarden(gardenData)
      .then(function(results) {
        console.log(results, 'SUCCESS INSIDE DELETE GARDEN');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE DELETEGARDEN');
        res.status(404).send(error);
      })
  },

  deletePlant: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE DELETEPLANT');
    var plantData = req.body;
    helper.deletePlant(plantData)
      .then(function(results) {
        console.log(results, 'SUCCES INSIDE DELETEPLANT in plantsHandler.js');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE DELETEPLANT in plantsHandler.js');
        res.status(404).send(error);
      })
  },

  addPlants: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE ADDPLANT');
    var plantData = req.body;
    helper.addPlant(plantData)
      .then(function(results) {
        //need to call addSpeciesInfo?
        console.log(results, 'SUCCESS IN ADDPLANT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE ADDPLANT HANDLER');
        res.status(404).send(error);
      })
  },

  addGarden: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE ADDGARDEN');
    var gardenData = req.body;
    var userData = req.body;
    helper.addGarden(gardenData)
      .then(function(results) {
        console.log(results, 'SUCCCESSSSSS')
        helper.addUserToGarden(gardenData, userData)
          .then(function(results) {
            console.log('SUCCESS IN ADDGARDEN HANDLER');
            res.status(200).send(results);
          })
          .catch(function(error) {
            console.log(error, 'ERROR INSIDE ADDGARDEN HANDLER');
            res.status(404).send(error);
          })
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE ADDGARDENGARDEN HANDLER');
        res.status(404).send(error);
      })

  },

  addGardenToPlant: function(req, res) {
    var garden = req.body.garden;
    var plant  = req.body.plant;
    helper.addGardenToPlant(plant, garden)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE addFlowerToGarden HANDLER');
        res.status(404).send(error);
      })
  },

  getPlantsForAUser: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETPLANTSFORAUSER');
    var userData = req.body;
    helper.getUserPlants(userData)
      .then(function(results) {
        console.log(results, 'SUCCESS IN GETPLANTSFORAUSER HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE GETPLANTSFORAUSER HANDLER');
        res.status(404).send(error);
      })
  },

  getSpecieInfo: function(req, res) {
    //  console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETSPECIEINFO');
    var specieData = req.body;

    helper.getSpeciesInfo(specieData)
      .then(function(results) {
        console.log('SUCCESS IN GETSPECIEINFO HANDLER');
        res.status(200).send(results.dataValues);
      })
      .catch(function(error) {
        console.log(error, 'ERROR ISNIDE GETSPECIEINFO HANDLER');
        res.status(404).send(error);
      })
  },

  getPlant: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETPLANTHABDKER');
    var plantData = req.body;
    helper.getPlantByNickname(plantData)
      .then(function(results) {
        console.log(results, 'SUCCESS IN GETPLANT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE GETPLANT HANDLER');
        res.status(404).send(error);
      })
  },



  getUserGardens: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETUSERGARDENSHANDLER');
    var userData = req.body;
    helper.getGardensFromUser(userData)
      .then(function(results) {
        console.log(results, 'SUCCESS IN GETUSERGARDENS HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE GETUSERGARDENS HANDLER');
        res.status(404).send(error);
      })
  },
  getGardenPlants: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETGARDENPLANTSHANDLER');
    var gardenData = req.body;
    helper.getGardenPlants(gardenData)
      .then(function(results) {
        console.log(results, 'SUCCESS IN GETGARDENPLANTS HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE GETGARDEN PLANTS HANDLER');
        res.status(404).send(error);
      })
  },

  getSpecieInfoById: function(req, res) {
    // console.log(req.body, 'THIS IS THE REQ.BODY INSIDE GETSPECIESINFOBYIDHANDLER');
    var idData = req.body;
    helper.getSpecieInfoById(idData)
      .then(function(results) {
        console.log(results, 'SUCCESS IN GETSPECIESINFOBYID HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error, 'ERROR INSIDE GETSPECIESINFOBYID HANDLER');
        res.status(404).send(error);
      })
  }
}
