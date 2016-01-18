var express = require('express');
var app = express();
var helper = require('./../../db/helpers.js');

module.exports = {
	 addPlant: function(req, res){
		 console.log(req.body, "THIS IS THE REQ.BODY");
		 var plantData = req.body //TODO: find the plant object on the req.body
		 helper.addPlant(plantData)
		 			 .then(function(results) {
						 console.log('SUCCESS GOT A POST REQUEST, ADDPLANT HANDLER');
						 res.status(200).send(results);
					 })
					 .catch(function(error) {
						 console.log(error, 'ERROR INSIDE ADDPLANT HANDLER');
					 })
	 }
}
