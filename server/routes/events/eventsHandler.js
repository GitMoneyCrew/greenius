var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

if(!process.env.DEPLOYED) {
	var config = require('./../../env/config.js');
}

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
//TODO: make process.env variables fro CLIENT_SECRET
// var oauth2Client = new OAuth2(process.env.GOOGLE_CALENDAR_ID || config.GOOGLE_CALENDAR_ID, process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET, "http://127.0.0.1:3000/auth/google/callback");
oauth2Client = new OAuth2( config.GOOGLE_CALENDAR_ID, config.GOOGLE_CLIENT_SECRET);
var mailer = require('./../../config/mailer.js');

module.exports = {

  addPlantEvent: function(req, res){
    // console.log(req.body, 'THIS IS REQ.BODY IN ADDPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.addPlantEvent(plantEventData)
      .then(function(results){
        console.log('SUCCESS INSIDE ADDPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE ADDPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getPlantEvent: function(req, res){
    console.log(req.body, 'THIS IS REQ.BODY IN GETPLANTEVENT HANDLER');
    var plantEventData = req.body;
    helper.getPlantEvents(plantEventData)
      .then(function(results){
        console.log('SUCCESS INSIDE GETPLANTEVENT HANDLER');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETPLANTEVENT HANDLER');
        res.status(404).send(error);
      });
  },

  getUserEvents: function(req, res){
    console.log(req.body, 'THIS IS THE REQ.BODY IN GETUSEREVENT HANDLER');
    var userData = req.body;
    helper.getUserEvents(userData)
      .then(function(results){
        console.log('SUCCESS INSIDE GETUSEREVENTS');
        res.status(200).send(results);
      })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS HANDLER');
        res.status(404).send(error);
      });
  },

  postToGoogleCalendar: function(req, res){
    oauth2Client.setCredentials({
     access_token: req.body.token.accessToken,
     refresh_token: req.body.token.refreshToken
   });
   console.log(oauth2Client, 'LOOK AT MEEEEEEEE')
  //  console.log(req.body, 'THIS IS THE REQ.BODY IN POSTTOGOOGLECALENDAR HANDLER');
   //TODO GET WHAT YOU NEED FROM THE REQ.BODY;
   var description = req.body  //TODO GET WHAT YOU NEED FROM THE REQ.BODY;

   var event = {
     'summary' : description,
     'description' : description,
     'start' : {
       'dateTime': req.body.eventDate
     },
     'end' : {
       'dateTime': req.body.endDate //have some logic that this is three months after plantDate;
     }
   }
   var calendar = google.calendar('v3');

  //  TODO fix google calendar
  //  calendar.events.insert({
  //    auth: oauth2Client,
  //    calendarId: 'primary',
  //    resource: event,
  //  }, function(err, event){
  //    if(err){
  //      console.log('Oh no! There was an error contacting the calendar service: ', err);
  //      return;
  //    }

    // TODO fix so that it only send an email on that day
     var recepient = req.body.email;
     mailer.sendMail(recepient);
     res.send(200).status('POSTED TO GOOGLE CALENDAR ');

  //  })
 },

 removePlantEvent: function(req, res){
   console.log(req.body, 'THIS IS REQ.BODY IN REMOVEPLANTEVENT HANDLER');
   var plantEventData = req.body;
   helper.removePlantEvent(plantEventData)
     .then(function(results){
       console.log('SUCCESS INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(200).send(results);
     })
     .catch(function(error){
       console.log(error, 'ERROR INSIDE REMOVEPLANTEVENT HANDLER');
       res.status(404).send(error);
     });
 }
};
