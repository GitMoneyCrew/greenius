var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['Plants', '$state', '$window', 'Events', 'store', function(Plants, $state, $window, Events, store){
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
  that.dropCallback = function(event, index, item, external, type){
    var plant = {plantId: item.plantId};
    var garden = {gardenName: item.bucket};
    var name = {nickname: item.name};
    that.idOfPlant = item.plantId;

    if(confirm('Are you sure you want to plant this today?')){

      that.getExpectedPlantLife();
      that.getWateringInfo(name);
      Plants.addGardenToPlant(plant, garden)
        .then(function(results){
          that.getUserPlants()
        })
        .catch(function(error){
          console.log(error, 'ERROR ADDING GARDEN TO PLANT');
        })
    }
     else{
      // return plant back to 'Nursery'
    }
  };

  // query database using plant nickname for species wateringInformation
  that.getWateringInfo = function(plant) {
    Plants.getPlant(plant)
      .then(function(plantResult) {
        var plantObj = {id: plantResult.data.idOfSpecies};
        Plants.getSpecieById(plantObj)
        .then(function(speciesResult) {
          that.plantWaterSched = speciesResult.data.wateringInformation;
          that.formDate(that.findWaterSched(that.expectedPlantLife, that.plantWaterSched))
        })
      })
      .catch(function(error){
        console.log(error, 'ERROR IN DELETING PLANTS OF A GARDEN CONTROLLER');
      })
  };

  // prompt user for expected plant life (Seasonal, Semi-annual, Annual)
  that.getExpectedPlantLife = function() {
    var inputPlantLife = prompt("Input expected Plant Life: (Seasonal, Semi-annual, Annual)");
    if (inputPlantLife != null) {
      if(inputPlantLife === 'Seasonal') {
        that.expectedPlantLife = 90;
      } else if (inputPlantLife === 'Semi-annual') {
        that.expectedPlantLife = 180;
      } else {
        that.expectedPlantLife = 365;
      }
    }
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

  // format date to google calendar specifications (e.g "2016-04-20T18:36:42-07:00")
  that.formDate = function(dates) {
    var results = [];
    for(var i = 0; i < dates.length; i++) {
      results.push([moment(dates[i][0]).format(), moment(dates[i][1]).format()]);
    }
    that.wateringSchedule = results;
    console.log(that.wateringSchedule);
    that.addEvents();
  };

  that.addEvents = function(){
    var plantEvent = {};
    plantEvent.username = that.data.username;
    plantEvent.idOfPlant = that.idOfPlant;
    plantEvent.token = {};
    plantEvent.token.accessToken = that.data.token.accessToken;
    plantEvent.token.refreshToken = that.data.token.refreshToken;
    plantEvent.email = that.data.email;

    for(var i = 0 ; i< that.wateringSchedule.length; i++){
      plantEvent.eventDate= that.wateringSchedule[i][0];
      plantEvent.endDate = that.wateringSchedule[i][1];
      // console.log(plantEvent, 'plantEVENT OBJ')
      Events.addPlantEvent(plantEvent)
        .then(function(results){
          Events.postToGoogleCalendar(plantEvent)
            .then(function(results){
              console.log('SUCESS TO POSTTOGOOGLECALENDAR CONTROLLER', results)
            })
            .catch(function(error){
              console.log(error, 'ERROR TO POSTTOGOOGLECALENDAR CONTROLLER')
            })
        })
    }
  }

  that.getUserPlants = function(){
    var tempArray = [];
    Plants.getUsersPlants(that.data)
      .then(function(results) {
        for(var i = 0 ; i < results.data.length; i++){
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

  that.getUsersGardens = function(){
    Plants.getUserGardens(that.data)
      .then(function(results) {
        for(var i = 0; i < results.length; i++){
          that.gardens[results[i].id] = results[i].gardenName
        }
        that.lists = that.setList(that.gardens)
        that.getSpecifcGardenPlants();
        that.formatGardenForSandbox();
        // that.getUserPlants();
      })
      .catch(function(error) {
        console.log(error);
      })
  };

  that.getSpecifcGardenPlants = function(){
    if(that.data.gardenName){
      Plants.getGardenPlants(that.data)
        .then(function(results) {
          // console.log(results, 'SUCCESS IN getSpecifcGardenPlants CONTROLLER');
          that.resultPlants = results;
          that.count++;
          // that.formatGardenForSandbox();
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  };

  that.addGarden = function(){
    if(that.data.gardenAdded){
      var gardenObj = {};
      gardenObj.gardenName = that.data.gardenAdded;
      gardenObj.username = that.data.username;
      // console.log('HELLO', gardenObj);
      Plants.addGarden(gardenObj)
        .then(function(results){
          // console.log(results, 'JWKELJR:WLKJR#_)($_)@#($(*!@#))')
          that.getUserPlants();
        })
        .catch(function(error){
          console.log(error);
        });
    }
  }

  that.deleteGarden = function(){
    if(confirm('Are You sure you want to delete this garden and all its plants?')){
      if(that.data.gardenDelete){
        var gardenObj= {};
        gardenObj.gardenName = that.data.gardenDelete
        Plants.getGardenPlants(gardenObj)
          .then(function(results){
            console.log(results, 'RESULTS IN GETGARDENPLANTSDELETEGAREDJFKLN');
            for(var i = 0; i<results.length; i++){
              console.log(results[i].nickname, 'nickname')
              var temp = {};
              temp.plantDelete = results[i].nickname;
              console.log(temp, "jlkajfsalkjklewiouriowne")
              Plants.deletePlant(temp);
              that.getUserPlants();
            }
            Plants.deleteGarden(that.data)
            .then(function(results) {
              console.log("RESSSS", gardenObj)
              for(var key in that.gardens){
                if(that.gardens[key] === gardenObj.gardenName){
                  delete that.gardens[key]
                }
              }
              that.getUserPlants();
              console.log(results, 'RESULTS IN DELETE GARDEN CONTROLLER');

            })
            .catch(function(error){
              console.log(error, 'ERROR IN DELETE GARDEN CONTROLLER');
            })
          })
          .catch(function(error){
            console.log(error, 'ERROR IN DELETING PLANTS OF A GARDEN CONTROLLER');
          })

      }
    }
  };

  that.setList = function(gardens) {
    //return array of objects
    var res = { 0: { label: "The Nursery", plants: [] }}
    for(var garden in gardens){
      if(res[garden] === undefined){
            res[garden] = {label: gardens[garden], plants: []}
        }
    }
    return res;
  };

  that.formatGardenForSandbox = function(){
    that.resultPlants.forEach(function(element){
      if(element.idOfGarden === ""){
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
