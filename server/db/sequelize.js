var Sequelize = require('sequelize');

// establish a connection
var sequelize = new Sequelize('test', null, null,{
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

var models = {};

models.User = sequelize.define('User', {
  username: {
   type: Sequelize.STRING
 },
 password: {
   type: Sequelize.STRING
 },
 email: {
   type: Sequelize.STRING
 },
 location: {
   type: Sequelize.STRING
 },
 userPic: {
   type: Sequelize.STRING
 }
});

models.Plant = sequelize.define('Plant', {
  idOfUser:{
    type: Sequelize.INTEGER
  },
  idOfSpecies:{
    type: Sequelize.INTEGER
  },
  plantDate:{
    type: Sequelize.INTEGER
  },
  nickname: {
    type: Sequelize.STRING
  },
  plantStatus: {
    type: Sequelize.STRING
  },
  idOfGarden: {
    type: Sequelize.INTEGER
  }
});

models.SpeciesInfo = sequelize.define('SpeciesInfo', {
  commonName: {
    type: Sequelize.STRING
  },
  botanicalName: {
    type: Sequelize.STRING
  },
  plantPic: {
    type: Sequelize.STRING
  },
  plantLink: {
    type: Sequelize.STRING
  },
  wateringInformation: {
    type: Sequelize.STRING
  },
  typeOf: {
    type: Sequelize.STRING
  },
  exposure: {
    type: Sequelize.STRING
  },
  generalInformation: {
    type: Sequelize.STRING
  },
  plantingGuide: {
    type: Sequelize.STRING
  },
  pestsDiseases: {
    type: Sequelize.STRING
  },
  careGuide: {
    type: Sequelize.STRING
  }
});

models.Garden = sequelize.define('Garden', {
  gardenName: {
    type: Sequelize.STRING
  }
});

//establish the relationships between the tables
models.User.hasMany(models.Plant);
models.Garden.hasMany(models.Plant);
models.SpeciesInfo.hasMany(models.Plant);
models.User.belongsToMany(models.Garden, {through: 'Plant'});
models.Garden.belongsToMany(models.User, {through: 'Plant'});

// {force: true} will drop the table and re-create it
models.User.sync({force: false})
           .then(function() {
             console.log('User sync in sequelize.js');
           });

models.Plant.sync({force: false})
            .then(function() {
              console.log('Plant sync in sequelize.js');
            });

models.SpeciesInfo.sync({force: false})
            .then(function() {
              console.log('SpeciesInfo sync in sequelize.js');
            });

models.Garden.sync({force: false})
             .then(function() {
               console.log('Garden sync in sequelize.js');
             });

module.exports = models;
