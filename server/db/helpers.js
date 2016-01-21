var db = require('./sequelize.js');

var helpers = {

  //user is an object with keys: username, password, email, location, userPic
  addUser : function(user) {
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
       if(userResult){
         throw Error('Username is already taken');
       }
       return db.Users.create(user);
    })
    .catch(function(error) {
       console.log('Error adding user to the database ', error);
    })
  },

  addPlant : function(plant) {
    var plantObj = {};

    // Check for User ID
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResults) {
      if(!userResults) {
        throw Error('Username does not exist');
      }
      console.log('User ID exists: ', userResults);
      plantObj.userResults = userResults; // TODO: Findout userId

        // Check for Species ID
        return db.SpeciesInfos.findOne({
          where: {speciesName: plant.commonName}
        })
        .then(function(speciesResults) {
          if(!speciesResults) {
            throw Error('Species does not exist');
          }
          console.log('Species exists: ', speciesResults);
          plantObj.speciesResults = speciesResults; // TODO: Findout speciesId

            // Check for Garden ID
            return db.Gardens.findOne({
              where: {gardenName: plant.gardenName}
            })
            .then(function(gardenResults) {
              if(!gardenResults) {
                throw Error('Garden does not exist');
              }
              console.log('Garden exists: ', gardenResults);
              plantObj.gardenResults = gardenResults; // TODO: Findout gardenId

                // Insert plant into Plant table
                return db.Plants.create({
                  idOfUser: plantObj.userResults,
                  idOfSpecies: plantObj.speciesResults,
                  plantDate: plant.plantDate,
                  nickname: plant.nickname,
                  plantStatus: plant.plantStatus,
                  idOfGarden: plantObj.gardenResults
                })
                .then(function(plantResults) {
                  console.log('Add plant successful');
                })
                .catch(function(error) {
                   console.log('Error adding plant to the database ', error);
                })
            })
        })
    })
  },

  //garden is an object with gardenName
  addGarden : function(garden) {
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(gardenResult){
        throw Error('Garden name is already taken');
      }
      return db.Gardens.create(garden);
    })
    .catch(function(error) {
      console.log('Error adding garden to database ', error);
    })
  },

  //species is an object with commonName,botanicalName, plantLink, plantPic, wateringInformation, germinationInformation, locationInformation
  addSpeciesInfo : function(species) {
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(speciesResult) {
      if(speciesResult){
        throw Error('Species info is already in database');
      }
      return db.SpeciesInfos.create({
        commonName: species.commonName,
        botanicalName: species.botanicalName,
        plantPic: species.plantPic,
        plantLink: species.plantLink,
        wateringInformation: species.wateringInformation,
        typeOf: species.typeOf,
        exposure: species.exposure,
        generalInformation: species.generalInformation,
        plantingGuide: species.plantingGuide,
        pestsDiseases: species.pestsDiseases,
        careGuide: species.careGuide
      })
    })
    .then(function(speciesResult) {
      console.log('add species successful');
    })
    .catch(function(error) {
      console.log('Error adding species to database ', error);
    })
  },

  addGardenToPlant : function(plant, garden) {
    var plantObj = {};
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name exists: ', gardenResult.gardenName);
      plantObj.gardenId = gardenResult.Id;

      return db.Plants.findOne({ // TODO: Make sure to pass in plantId
        where: {plantId: plant.plantId}
      })
      .then(function(plantResult) {
        if(!plantResult) {
          throw ERROR('Plant ID does not exist');
        }
        console.log('Plant name exists: ', plantResult);
          return db.Plants.set({
            gardenId: plantObj.gardenId
          })
        })
        .then(function(addPlantToGardenResult) {
          console.log('Add plant to garden successful');
        })
        .catch(function(error) {
           console.log('Error adding plant to the database ', error);
        })
    })
  },

  //addGardenToUser : function(user, garden) {

  // }, // future feature

  getUser : function(user) {
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('Username does not exist');
      }
      console.log('Username exists: ', userResult.username);
    })
  },

  getGarden : function(garden) {
    gardenObj = {};
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name: ', gardenResult.gardenName);
      gardenObj.gardenId = gardenResult.gardenId; //TODO: find out gardenId
      return db.Plants.getOne({
        where: {idOfGarden: gardenObj.gardenId}
      })
      .then(function(plantResult) {
        if(!plantResult) {
          throw ERROR('No plants associated with this garden');
        }
        console.log('Plants associated with this garden ', plantResult);
      })
      .catch(function(error) {
      console.log('Error, retrieving garden ', error);
      })
    })
  },

  getSpeciesInfo : function(species) {
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(specieResult) {
      if(!specieResult) {
        throw ERROR('Species does not exist');
      }
      console.log(specieResult, "yo this is specieResult database")
      console.log('Specie associated with this name ', species.commonName);
      return specieResult;
    })
    .catch(function(error) {
      console.log('Error, retrieving speciesInfo: ', error);
    })
  },

  getPlant : function(plant) {
    return db.Plants.findOne({
     where : {nickname: nickname}
    })
    .then(function(plantResult) {
         if(!userResult) {
            throw ERROR ('Plant nickname does not exist');
        }
        console.log ('Plant exists: ' , plantResult);
    })
  },

  getUserPlants : function(user) {
    var userId;
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('User does not exist');
      }
      console.log('User associated with this plant: ', error);
      userId = userResult.userId;  //TODO: find out userId

      return db.Plants.findAll({
        where: {idOfUser: userId}
      })
      .then(function(plantsResult) {
        if(plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('Plants associated with this user ', plantResult);
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
  },

  getGardenPlants : function(garden) {
    var gardenId;
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden does not exist');
      }
      console.log('Garden associated with this plant: ', gardenResult);
      gardenId = gardenResult.gardenId; //TODO: find out gardenId

      return db.Plants.findAll({
        where: {idOfGarden: gardenId}
      })
      .then(function(plantsResult) {
        if(!plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('Plants associated with this garden ', plantsResult);
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
  }
};

  // getGardenUsers : function(garden) {

  // }  // future feature

module.exports = helpers;
