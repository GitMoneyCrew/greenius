var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

module.exports = {
	addUser: function(req, res){
		console.log(req.body, "THIS IS THE REQ.BODY");
		var userData = req.body; //TODO: find the user object on the req.body
		helper.addUser(userData)
			  .then(function(results) { //TODO: fix authentication status and tokens
				  res.status(200);
				  res.send(results);
			  })
			  .catch(function(error) {
			      console.log(error, 'ERROR INSIDE, ADDUSER HANDLER');
			      res.status(404);
			      res.send(error);
			  })
	},


	deleteUser: function(req, res){
		console.log('REQ.BODY FOR DELETEUSER IN usersHandler.js', req.body);
		var userData = req.body;
		helper.deleteUser(userData)
			.then(function(results) {
				res.status(200);
				res.send(results);
			})
			.catch(function(error) {
				res.status(404);
				res.send(error);
			})
	}



};