var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['Plants', '$state', '$window', 'Events', 'store', function(Plants, $state, $window, Events, store) {
  var that = this;
  that.data = {};
  that.data.username = $state.params.username;
  that.data.username = $window.localStorage.getItem('username');
  that.data.gardenName = '';
  that.data.nickname;
  that.data.plantDate;
  that.data.plantStatus;
  that.data.idOfGarden;
  that.data.gardenAdded = '';
  that.data.token={};
  that.data.token.accessToken = store.get('access_token');
  that.data.token.refreshToken = store.get('refresh_token');
  that.data.email = $window.localStorage.getItem('email');
  that.gardens = {};
  that.count = 0;
  that.resultPlants;
  that.lists;
  that.gardenArray = [];
  that.expectedPlantLife;
  that.plantWaterSched;
  that.wateringSchedule;
  that.idOfPlant;

  // on move plant from 'nursery' sandbox to 'garden' sandbox, set garden and create watering events
  that.dropCallback = function(event, index, item, external, type) {
    var plant = {plantId: item.plantId};
    var garden = {gardenName: item.bucket};
    var name = {nickname: item.name};
    that.idOfPlant = item.plantId;
      that.getExpectedPlantLife();
      that.getWateringInfo(name);
      Plants.addGardenToPlant(plant, garden)
        .then(function(results) {
          that.getUserPlants()
        })
        .catch(function(error) {
          console.log(error);
        });
  };

  // query database using plant nickname for species wateringInformation
  that.getWateringInfo = function(plant) {
    Plants.getPlant(plant)
      .then(function(plantResult) {
        var plantObj = {idOfSpecies: plantResult.data.idOfSpecies};
        Plants.getSpecieById(plantObj)
        .then(function(speciesResult) {
          that.plantWaterSched = speciesResult.data.wateringInformation;
          that.formDate(that.findWaterSched(that.expectedPlantLife, that.plantWaterSched))
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // prompt user for expected plant life (Seasonal, Semi-annual, Annual)
  that.getExpectedPlantLife = function() {
        that.expectedPlantLife = 100;
  };

  // get current time and create reoccuring schedule
  that.findWaterSched = function(plantLife, waterSched) {
    var currentDate = moment().valueOf();
    var plantDate = currentDate;
    var results = [];
    var theWaterSched = [604800000/1,604800000/2,604800000/3];
    var endDate = moment().add(plantLife, 'days').valueOf();

    while(plantDate < endDate) {
      plantDate = plantDate + theWaterSched[waterSched - 1];
      var endTime = plantDate + 900000;
      results.push([plantDate, endTime]);
    }
    return results;
  };

  that.formDate = function(dates) {
    var results = [];
    for(var i = 0; i < dates.length; i++) {
      results.push([moment(dates[i][0]).format(), moment(dates[i][1]).format()]);
    }
    that.wateringSchedule = results;
    that.addEvents();
  };

  that.addEvents = function() {
    for(var i = 0 ; i< that.wateringSchedule.length; i++) {
      var plantEvent = {};
      plantEvent.username = that.data.username;
      plantEvent.idOfPlant = that.idOfPlant;
      plantEvent.token = {};
      plantEvent.token.accessToken = that.data.token.accessToken;
      plantEvent.token.refreshToken = that.data.token.refreshToken;
      plantEvent.email = that.data.email;
      plantEvent.eventDate= that.wateringSchedule[i][0];
      plantEvent.endDate = that.wateringSchedule[i][1];
      Events.addPlantEvent(plantEvent)
        .then(function(results) {
        })
        .catch(function(error) {
          console.log(error)
        });
      }
      Events.sendPlantMail(plantEvent)
        .then(function(results) {
        })
      .catch(function(error) {
        console.log(error)
      });
  };

  that.getUserPlants = function() {
    var tempArray = [];
    Plants.getUsersPlants(that.data)
      .then(function(results) {
        for(var i = 0 ; i < results.data.length; i++) {
          var obj = {};
          obj.nickname    = results.data[i].nickname;
          obj.plantDate   = results.data[i].plantDate;
          obj.plantStatus = results.data[i].plantStatus;
          obj.idOfGarden  = results.data[i].idOfGarden || '';
          obj.plantId     = results.data[i].id;
          obj.speciesId   = results.data[i].idOfSpecies;
          tempArray.push(obj);
        }
        that.resultPlants = tempArray;
        that.getUsersGardens();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  that.getUsersGardens = function() {
    Plants.getUserGardens(that.data)
      .then(function(results) {
        for(var i = 0; i < results.length; i++) {
          that.gardens[results[i].id] = results[i].gardenName
        }
        that.lists = that.setList(that.gardens)
        that.getSpecifcGardenPlants();
        that.formatGardenForSandbox();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  that.getSpecifcGardenPlants = function() {
    if(that.data.gardenName) {
      Plants.getGardenPlants(that.data)
        .then(function(results) {
          that.resultPlants = results;
          that.count++;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  that.addGarden = function() {
    if(that.data.gardenAdded) {
      var gardenObj = {};
      gardenObj.gardenName = that.data.gardenAdded;
      gardenObj.username = that.data.username;
      Plants.addGarden(gardenObj)
        .then(function(results) {
          that.getUserPlants();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  that.deleteGarden = function() {
    if(confirm('Are You sure you want to delete this garden and all its plants?')) {
      if(that.data.gardenDelete) {
        var gardenObj= {};
        gardenObj.gardenName = that.data.gardenDelete;
        Plants.getGardenPlants(gardenObj)
          .then(function(results) {
            for(var i = 0; i<results.length; i++) {
              var temp = {};
              temp.plantDelete = results[i].nickname;
              temp.idOfPlant = results[i].id;
              Events.removeAllPlantEvents(temp)
                .then(function(results) {
                  Plants.deletePlant(temp);
                  that.getUserPlants();
                })
            }
            Plants.deleteGarden(that.data)
            .then(function(results) {
              for(var key in that.gardens) {
                if(that.gardens[key] === gardenObj.gardenName) {
                  delete that.gardens[key]
                }
              }
              that.getUserPlants();
            })
            .catch(function(error) {
              console.log(error);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  };

  that.setList = function(gardens) {
    //return array of objects
    var res = { 0: { label: "The Nursery", plants: [] }}
    for(var garden in gardens) {
      if(res[garden] === undefined) {
            res[garden] = {label: gardens[garden], plants: []}
        }
    }
    return res;
  };

  that.formatGardenForSandbox = function() {
    that.resultPlants.forEach(function(element) {
      if(element.idOfGarden === '') {
        that.lists[0].plants.push({
          name: element.nickname,
          gardenId: element.idOfGarden,
          plantId: element.plantId,
          speciesId: element.speciesId
        })
      } else{
        that.lists[element.idOfGarden].plants.push({
          name: element.nickname,
          gardenId: element.idOfGarden,
          plantId: element.plantId,
          speciesId: element.speciesId
        })
      }
    })
  };

  that.getUserPlants();

}]);
