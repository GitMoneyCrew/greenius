var db = require('./sequelize.js');

var helpers = {

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
       console.log('AddUser was successful');
       return db.Users.create(user);
    })
    .catch(function(error) {
       console.log('Error adding user to the database ', error);
    })
  },

  //user is an object with username
  deleteUser : function(user) {
    return db.Users.destroy({
     where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult){
        throw Error('Username not doesnt exist! cant be deleted')
      }
      console.log('DeleteUser was successful');
      return userResult;
    })
    .catch(function(error) {
      console.log('Error adding user to the database', error);
    })
  },

  //plant is an object with username, commonName, nickname, plantStatus
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
      plantObj.userId = userResults.id;
        //Check for commonName in SpeciesInfos table
      return db.SpeciesInfos.findOne({
        where: {commonName: plant.commonName}
      })
      .then(function(speciesResults) {
        if(!speciesResults) {
          throw Error('Species does not exist');
        }
        plantObj.speciesId = speciesResults.id;
          // Insert plant into Plant table
        return db.Plants.create({
          idOfUser: plantObj.userId,
          idOfSpecies: plantObj.speciesId,
          nickname: plant.nickname,
          plantStatus: plant.plantStatus
        })
        .then(function(plantResults) {
          console.log('Add plant successful');
          return plantResults;
        })
        .catch(function(error) {
           console.log('Error adding plant to the database ', error);
        })
      })
    })
  },

  //plant is an object with id, plantDate
  updatePlantDate: function(plant) {
     // Check for id in Plants table
    return db.Plants.findOne({
      where: {id: plant.id}
    })
    .then(function(plantResult) {
      if(!plantResult) {
        throw ERROR('Plant does not exist');
      }
      // Update plantDate in Plant table
      return plantResult.update({
        plantDate: plant.plantDate
      })
      .then(function(updatedPlant) {
        if(!updatedPlant) {
          throw ERROR('Error updating plantDate');
        }
        Console.log('UpdatedPlantDate was successful');
        return updatedPlant;
      })
    })
    .catch(function(error) {
      console.log('Error updating plantDate ', error);
    })
  },

  // plantData is an object with plantDelete
  deletePlant: function(plantData) {
    return db.Plants.destroy({
      where: {nickname: plantData.plantDelete}
    })
    .then(function(plantResult) {
      if(!plantResult){
        throw Error('Plant does not exist, cannot be deleted', error);
      }
      console.log('DeletePlant was successful');
      return plantResult;
    })
    .catch(function(error) {
      console.log('Error deleting plant from database', error)
    })
  },

  // eventData is an object with username, idOfPlant, eventDate
  addPlantEvent: function(eventData) {
    var idOfUser;
    //Check for username in Users Table
    return db.Users.findOne({
      where: {username: eventData.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw Error('User does not exist, event cannot be added', error);
      }
      idOfUser = userResult.id;
      // Check to see if event already exists
      return db.Events.findOne({
        where: {
          idOfUser: idOfUser,
          idOfPlant: eventData.idOfPlant,
          eventDate: eventData.eventDate
        }
      })
      .then(function(eventResult) {
        if(eventResult) {
          console.log('Event already exists in database');
          return;
        }
        // Insert event into Events table
        return db.Events.create({
          idOfUser: idOfUser,
          idOfPlant: eventData.idOfPlant,
          eventDate: eventData.eventDate
        })
        .then(function(eventsResult) {
          console.log('AddPlantEvent was successful');
          return eventsResult;
        })
        .catch(function(error) {
          console.log('Error adding event to database ', error);
        })
      })
    })
  },

  // eventData is an object with idOfPlant
  getPlantEvents: function(eventData) {
    return db.Events.findAll({
      where: {idOfPlant: eventData.idOfPlant}
    })
    .then(function(eventResults) {
      if(!eventResults) {
        throw Error('IdOfPlant does not exist in Events table ', error);
      }
      console.log('GetPlantEvents was successful');
      return eventResults;
    })
  },

  // eventData is an object with username
  getUserEvents: function(eventData) {
    var idOfUser;
    // check for username in Users table
    return db.Users.findOne({
      where: {username: eventData.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw Error('Username does not exist in Users table', error);
      }
      idOfUser = userResult.id;
      // findAll events associated with username
      return db.Events.findAll({
        where: {idOfUser: idOfUser}
      })
      .then(function(eventsResult) {
        if(!eventsResult) {
          throw Error('No events exist in the database', error);
        }
        console.log('GetUserEvents');
        return eventsResult;
      })
    })
    .catch(function(error) {
      console.log('Error finding events in database ', error);
    })
  },

  // eventData is an object with username, idOfPlant, eventDate
  removePlantEvent: function(eventData) {
    var idOfUser;
    var idOfEvent;
    //Check for username in Users Table
    return db.Users.findOne({
      where: {username: eventData.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw Error('User does not exist, event cannot be added', error);
      }
      idOfUser = userResult.id;
      // Check to see if event already exists
      return db.Events.findOne({
        where: {
          idOfUser: idOfUser,
          idOfPlant: eventData.idOfPlant,
          eventDate: eventData.eventDate
        }
      })
      .then(function(eventResult) {
        if(!eventResult) {
          throw Error('Event already exists in database ', error);
          return;
        }
        // Insert event into Events table
        idOfEvent = eventResult.id;
        return db.Events.destroy({
          where: {id: idOfEvent}
        })
        .then(function(eventsResult) {
          if(!eventsResult) {
            throw Error('Error deleting Event from database');
          }
          Console.log('RemovePlantEvent was successful');
          return eventsResult;
        })
        .catch(function(error) {
          console.log('Error removing event from database ', error);
        })
      })
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
      console.log('AddGarden was successful');
      return db.Gardens.create(garden);
    })
    .catch(function(error) {
      console.log('Error adding garden to database ', error);
    })
  },

   // gardenData is an object with gardenDelete
  deleteGarden: function(gardenData) {
    return db.Gardens.destroy({
      where: {gardenName : gardenData.gardenDelete}
    })
    .then(function(gardenResult) {
      if(!gardenResult){
        throw Error('Garden does not exist, cannot be deleted', error);
      }
      console.log('Deletegarden was successful');
      return gardenResult;
    })
    .catch(function(error) {
      console.log('Error deleting garden', error);
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
      if(!speciesResult) {
        throw Error('Error when adding species info ', error)
      }
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
     plantObj.gardenId = gardenResult.id;
     // Check for Plants gardenId
     return db.Plants.findOne({
       where: {id: plant.plantId}
     })
     .then(function(plantResult) {
       if(!plantResult) {
         throw ERROR('Plant ID does not exist');
       }
       // Update ifOfGarden in Plant table
       return plantResult.update({
        idOfGarden: plantObj.gardenId
       })
       .then(function(updatedPlant) {
        if(!plantResult) {
          throw ERROR('Error when adding garden to plant');
        }
        console.log('AddGardenToPlant was successful ');
        })
      })
      .catch(function(error) {
        console.log('Error adding plant to the database ', error);
      })
    })
  },

  //user is an object with username
  getUser : function(user) {
    //Check for username in Users table
    return db.Users.findOne({
      where: {username: user.username}
    })
    .then(function(userResult) {
      if(!userResult) {
        throw ERROR('Username does not exist', error);
      }
      console.log('GetUser was successful');
      return userResult;
    })
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
        throw ERROR('GardenName does not exist');
      }
      gardenObj.gardenId = gardenResult.id;
      //Check for idOfGarden in Plants table
      return db.Plants.findOne({
        where: {idOfGarden: gardenObj.gardenId}
      })
      .then(function(plantResult) {
        if(!plantResult) {
          throw ERROR('No plants associated with this garden');
        }
        console.log('Plants associated with this garden ');
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
      console.log('getSpeciesInfo was successful');
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
      userId = userResult.id;
      //findAll plants in the Plants table with specified userId
      return db.Plants.findAll({
        where: {idOfUser: userId}
      })
      .then(function(plantsResult) {
        if(!plantsResult) {
          throw ERROR('Plants do not exists');
        }
        console.log('GetUserPlants was successful');
        return plantsResult;
      })
      .catch(function(error) {
        console.log('Error, retrieving plantsResult: ', error);
      })
    })
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
