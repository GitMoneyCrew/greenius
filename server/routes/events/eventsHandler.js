var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

if(!process.env.DEPLOYED) {
	var config = require('./../../env/config.js');
}

var mailer = require('./../../config/mailer.js');

module.exports = {

  addPlantEvent: function(req, res){
    // console.log(req.body, 'THIS IS REQ.BODY IN ADDPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.addPlantEvent(plantEventData)
      .then(function(results){
        // console.log('SUCCESS INSIDE ADDPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE ADDPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getPlantEvent: function(req, res){
    // console.log(req.body, 'THIS IS REQ.BODY IN GETPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.getPlantEvents(plantEventData)
      .then(function(results){
        // console.log('SUCCESS INSIDE GETPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getUserEvents: function(req, res){
    // console.log(req.body, 'THIS IS THE REQ.BODY IN GETUSEREVENT HANDLER');
    var userData = req.body;
    var resultsArray = [];
    var eventDate;
    var nickname;
    var plant = {};
    var results = {};
    var len;
    var currentLen = 0;

    helper.getUserEvents(userData)
      .then(function(data){
        len = data.length;
        for(var i = 0; i<data.length; i++){
          plant.plantId = data[i].dataValues.idOfPlant;
          console.log(plant.plantId, 'plant iddddd');
          eventDate = data[i].dataValues.eventDate;
          if(results[plant.plantId] === undefined){
            results[plant.plantId] = {};
            results[plant.plantId].events = [];
          }
          results[plant.plantId].events.push(eventDate);
          helper.getPlantById(plant)
            .then(function(results2){
              currentLen++;
              var resultObj = {};
              nickname = results2.nickname
              id = results2.id
              results[id].nickname = nickname;
              if(currentLen === len){
                console.log('this sent', results);
                res.status(200).send(results);
              }
            })
        }
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS HANDLER');
        res.status(404).send(error);
      });
  },

  sendPlantMail: function(req, res){
     var recepient = req.body.email;
     mailer.plantMail(recepient);
     res.send(200).status('POSTED TO GOOGLE CALENDAR ');
 },

 removePlantEvent: function(req, res){
  //  console.log(req.body, 'THIS IS REQ.BODY IN REMOVEPLANTEVENT HANDLER');
   var plantEventData = req.body;
   helper.removePlantEvent(plantEventData)
     .then(function(results){
      //  console.log( results, 'SUCCESS INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(200).send(results);
     })
     .catch(function(error){
       console.log(error, 'ERROR INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(404).send(error);
     });
 },

 removeAllPlantEvents: function(req, res){
  //  console.log(req.body, 'THIS IS REQ.BODY IN REMOVEALLPLANTEVENTS HANDLER');
   var plantEventData = req.body;
   helper.removeAllPlantEvents(plantEventData)
    .then(function(results){
      // console.log(results, 'SUCCESS INSIDE REMOVEALLPLANTEVENTS HANDLER');
      res.status(200).send(results);
    })
    .catch(function(error){
      console.log(error, 'ERROR INSIDE REMOVEALLPLANTEVENTS HANDLER');
      res.status(404).send(error);
    })
 }
};
