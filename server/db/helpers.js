var db = require('./sequelize.js');

var helpers = {


  //adding deleteUser, deletePlant, deleteGarden
  deleteUser : function(userData) {
    console.log('userData in helpers.js', userData)
    return db.Users.destroy({
     where: {username: userData.usernameDelete}
    })
    .then(function(userResult) {
      if(!userResult){
        throw Error('username not doesnt exist! cant be deleted')
      }
    })
    .catch(function(error) {
      console.log('Error adding user to the database', error);
    })
  },

  addUser : function(user) {
    // Check for commonName in Users table
    return db.Users.findOne({
      where: {email: user.email}
    })
    .then(function(userResult) {
       if(userResult){
         throw Error('Username is already taken');
       }
       //Create a user in the Users table
       return db.Users.create(user);
    })
    .catch(function(error) {
       console.log('Error adding user to the database ', error);
    })
  },


  //plant is an object with username, commonName, gardenName, plantDate nickname, plantStatus
  addPlant : function(plant) {
    var plantObj = {};
    //Check for username in Users Table
    return db.Users.findOne({
      where: {username: plant.username}
    })
    .then(function(userResults) {
      if(!userResults) {
        throw Error('Username does not exist');
      }
      console.log('User ID exists: ', userResults);
      plantObj.userResults = userResults;

        //Check for commonName in SpeciesInfos table
        return db.SpeciesInfos.findOne({
          where: {commonName: plant.commonName}
        })
        .then(function(speciesResults) {
          if(!speciesResults) {
            throw Error('Species does not exist');
          }
          console.log('Species exists: ', speciesResults);
          plantObj.speciesResults = speciesResults;

            // Check for gardenName in Gardens table
            return db.Gardens.findOne({
              where: {gardenName: plant.gardenName}
            })
            .then(function(gardenResults) {
              if(!gardenResults) {
                throw Error('Garden does not exist');
              }
              console.log('Garden exists: ', gardenResults);
              plantObj.gardenResults = gardenResults;

                // Insert plant into Plant table
                return db.Plants.create({
                  idOfUser: plantObj.userResults.id,
                  idOfSpecies: plantObj.speciesResults.id,
                  plantDate: plant.plantDate,
                  nickname: plant.nickname,
                  plantStatus: plant.plantStatus,
                  idOfGarden: plantObj.gardenResults.id
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

  deleteGarden: function(gardenData) {
    return db.Gardens.destroy({
      where: {gardenName : gardenData.gardenDelete}
    })
    .then(function(gardenResult) {
      if(!gardenResult){
        throw Error('Garden does not exist, cannot be deleted', error);
      }
      return gardenResult;
    })
    .catch(function(error) {
      console.log('Error deleting garden', error);
    })
  },

  deletePlant: function(plantData) {
    return db.Plants.destroy({
      where: {nickname: plantData.plantDelete}
    })
    .then(function(plantResult) {
      if(!plantResult){
        throw Error('Plant does not exist, cannot be deleted', error);
      }
      console.log(plantResult, 'RESULT INSIDE DELETE PLANT HELPER')
      return plantResult;
    })
    .catch(function(error) {
      console.log('Error deleting plant from database', error)
    })
  },


  //garden is an object with gardenName
  addGarden : function(garden) {
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(gardenResult){
        throw Error('Garden name is already taken');
      }
      //Insert garden into Garden table
      return db.Gardens.create(garden);
    })
    .catch(function(error) {
      console.log('Error adding garden to database ', error);
    })
  },

  //species is an object with commonName,botanicalName, plantLink, plantPic, wateringInformation, germinationInformation, locationInformation
  addSpeciesInfo : function(species) {
    //Check for commonName in SpeciesInfos table
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(speciesResult) {
      if(speciesResult){
        throw Error('Species info is already in database');
      }
      // Insert species into SpeciesInfos table
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

  //plant is an object with plantId
  //garden is an object with gardenName
  addGardenToPlant : function(plant, garden) {
   var plantObj = {};
   // Check for Gardens gardenName
   return db.Gardens.findOne({
     where: {gardenName: garden.gardenName}
   })
   .then(function(gardenResult) {
     if(!gardenResult) {
       throw ERROR('Garden name does not exist');
     }
     console.log('Garden name exists: ', gardenResult.gardenName);
     plantObj.gardenId = gardenResult.id;
     // Check for Plants gardenId
     return db.Plants.findOne({
       where: {id: plant.plantId}
     })
     .then(function(plantResult) {
       if(!plantResult) {
         throw ERROR('Plant ID does not exist');
       }
       return plantResult.update({
        idOfGarden: plantObj.gardenId
       })
       .then(function(updatedPlant) {
        if(!plantResult) {
          throw ERROR('Error when adding garden to plant');
        }
       console.log('This is the updatedPlant: ', updatedPlant);
       })
     })
     .catch(function(error) {
        console.log('Error adding plant to the database ', error);
     })
   })
 },

  //addGardenToUser : function(user, garden) {

  // }, // future feature

  //user is an object with username
  getUser : function(user) {
      //Check for username in Users table
      return db.Users.findOne({
        where: {username: user.username}
      })
      .then(function(userResult) {
        if(!userResult) {
          throw ERROR('Username does not exist');
        }
        console.log('Username exists: ', userResult.username);
        return userResult;
      })
      // .catch(function(error){
      //   console.log(error, 'ERROR INSIDE GET USER HELPER');
      // })
    },

  //garden is an object with gardenName
  getGarden : function(garden) {
    gardenObj = {};
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden name does not exist');
      }
      console.log('Garden name: ', gardenResult.gardenName);
      gardenObj.gardenId = gardenResult.id;
      //Check for idOfGarden in Plants table
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

  //species is an object with commonName
  getSpeciesInfo : function(species) {
    //Check for commonName in SpeciesInfos table
    return db.SpeciesInfos.findOne({
      where: {commonName: species.commonName}
    })
    .then(function(specieResult) {
      if(!specieResult) {
        throw ERROR('Species does not exist');
      }
      return specieResult;
    })
    .catch(function(error) {
      console.log('Error, retrieving speciesInfo: ', error);
    })
  },

  //plant is an object with nickname
  getPlantByNickname : function(plant) {
    //Check for nickname in Plants table
    return db.Plants.findOne({
     where : {nickname: plant.nickname}
    })
    .then(function(plantResult) {
         if(!plantResult) {
            throw ERROR ('Plant nickname does not exist');
        }
        console.log ('Plant exists: ' , plantResult);
        return plantResult;
    })
  },

  //user is an object with username
  getUserPlants : function(user) {
    var userId;
    //Check for username in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('User does not exist');
      }
      //set userId variable for future use
      console.log(userResult.id, "oHAYHWHWHWEJFJH@#$(_#$)")
      userId = userResult.id;
      console.log('User associated with this plant: ', userId);
      //findAll plants in the Plants table with specified userId
      return db.Plants.findAll({
        where: {idOfUser: userId}
      })
      .then(function(plantsResult) {
        if(!plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('Plants associated with this user WERREREWEREWRWEREWR ', plantsResult);
        return plantsResult;
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
    // .catch(function(error) {
    //   console.log('ERROR, RETRIEVING GETUSERPLANTS', error)
    // })
  },

  //garden is an object with gardenName
  getGardenPlants : function(garden) {
    var gardenId;
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden does not exist');
      }
      console.log('Garden associated with this plant: ', gardenResult);
      gardenId = gardenResult.id;
      //Check for idOfGarden in Plants table
      return db.Plants.findAll({
        where: {idOfGarden: gardenId}
      })
      .then(function(plantsResult) {
        // if(!plantsResult) {
        //   throw ERROR('Plants do not exists');
        // }
        console.log('Plants associated with this garden ', plantsResult);
        return plantsResult;
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
  },

 
  
  //garden is an object with gardenName
  //user is an object with username
  addUserToGarden : function(garden, user) {
    var data = {};
    //Check for gardenName in Gardens table
    return db.Gardens.findOne({
      where: {gardenName: garden.gardenName}
    })
    .then(function(gardenResult) {
      if(!gardenResult) {
        throw ERROR('Garden does not exist');
      }
      data.gardenId = gardenResult.id;
      console.log('gardenId associated with this gardenName: ', data.gardenId);
      //Check for username in Users table
      return db.Users.findOne({
        where: {username: user.username}
      })
      .then(function(userResult) {
        if(!userResult) {
          throw ERROR('Plants do not exists');
        }
        data.userId = userResult.id;
        console.log('userId associated with this username: ', data.userId);
        // Insert a user/garden join into UsersGardens table
        return db.UsersGardens.create({
          userId: data.userId,
          gardenId: data.gardenId
        })
        .then(function(userGardenResult) {
          console.log('Join user to garden successful', userGardenResult);
        })
        .catch(function(error) {
          console.log('Error, retrieving plantsResult: ', error);
        })
      })
    })
  },

  // specieId is an object with an id key
  getSpecieInfoById : function(specieId){
    return db.SpeciesInfos.findOne({
      where: {id: specieId.id}
    })
    .then(function(specieResult) {
      if(!specieResult) {
        throw Error('Specie does not exist');
      }
      console.log(specieResult, "HEWOWERREIOROWIEURIOWE902$)(#$U)(#)")
      return specieResult;
    })
    .catch(function(error) {
      console.log('Error, retrieving species', error);
    })
  },
  // user is an object with username
  getGardensFromUser : function(user) {
    //Check for username in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw Error('User does not exist');
      }
      // console.log('UserId associated with this username: ', userResult);
      return userResult.getGardens()
      .then(function(gardenResults) {
        if(!gardenResults) {
          throw Error('Gardens do not exist');
        }
        console.log('Gardens associated with user: ', gardenResults);
        return gardenResults;
      })
      .catch(function(error) {
        console.log('Error, retrieving gardens: ', error);
      })
    })
    .catch(function(error) {
      console.log(error, 'ERROR IN GETGARDENSFROMUSER')
    })
  }

};

module.exports = helpers;
