var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');
var mailer = require('./../../config/mailer.js');

module.exports = {
	addUser: function(req, res){
		var userData = req.body;
		helper.addUser(userData)
			  .then(function(results){
          console.log(results, 'HEY BOO BOO')
          var email = results.dataValues.email
          mailer.signUpMail(email);
				  res.status(200).send(results);
			  })
			  .catch(function(error) {
			      console.log(error);
			      res.status(404).send(error);
			  })
	},

  getUser: function(req, res){
     var userData = req.body;
     helper.getUser(userData)
       .then(function(results){
         res.status(200).send(results);
       })
       .catch(function(error){
         res.status(404).send(error);
       })
   },

	deleteUser: function(req, res){
		var userData = req.body;
		helper.deleteUser(userData)
			.then(function(results){
				res.status(200).send(results);
			})
			.catch(function(error){
				res.status(404).send(error);
			})
	}



};
