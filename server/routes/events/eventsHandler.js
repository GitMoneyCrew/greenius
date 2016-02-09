var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

if(!process.env.DEPLOYED) {
	var config = require('./../../env/config.js');
}
var mailer = require('./../../config/mailer.js');

module.exports = {

  addPlantEvent: function(req, res) {
    var plantEventData = req.body;
    helper.addPlantEvent(plantEventData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getPlantEvent: function(req, res) {
    var plantEventData = req.body;
    helper.getPlantEvents(plantEventData)
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  getUserEvents: function(req, res) {
    var userData = req.body;
    var resultsArray = [];
    var eventDate;
    var nickname;
    var plant = {};
    var results = {};
    var len;
    var currentLen = 0;

    helper.getUserEvents(userData)
      .then(function(data) {
        len = data.length;
        for(var i = 0; i<data.length; i++) {
          plant.plantId = data[i].dataValues.idOfPlant;
          eventDate = data[i].dataValues.eventDate;
          if(results[plant.plantId] === undefined) {
            results[plant.plantId] = {};
            results[plant.plantId].events = [];
          }
          results[plant.plantId].events.push(eventDate);
          helper.getPlantById(plant)
            .then(function(results2) {
              currentLen++;
              var resultObj = {};
              nickname = results2.nickname
              id = results2.id
              results[id].nickname = nickname;
              if(currentLen === len) {
                res.status(200).send(results);
              }
            })
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(404).send(error);
      });
  },

  sendPlantMail: function(req, res) {
     var recepient = req.body.email;
     mailer.plantMail(recepient);
     res.send(200).status('POSTED TO GOOGLE CALENDAR ');
 },

 removePlantEvent: function(req, res) {
   var plantEventData = req.body;
   helper.removePlantEvent(plantEventData)
     .then(function(results) {
       res.status(200).send(results);
     })
     .catch(function(error) {
       console.log(error);
       res.status(404).send(error);
     });
 },

 removeAllPlantEvents: function(req, res) {
   var plantEventData = req.body;
   helper.removeAllPlantEvents(plantEventData)
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.status(404).send(error);
    });
 }
};
