var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['Plants', '$state', '$window', 'Events', function(Plants, $state, $window, Events){
  var that = this;
  that.data = {};
  that.data.username = $state.params.username;
  that.data.username = $window.localStorage.getItem('username');
  that.data.gardenName = '';
  that.data.nickname;
  that.data.plantDate;
  that.data.plantStatus;
  that.data.idOfGarden;
  that.gardens = {"0": "The Nursery"};
  that.count = 0;
  that.resultPlants;
  that.lists;
  that.gardenArray = [];
  that.data.gardenAdded = '';

  // that.confirm = function(){
  //   if(confirm('Are you sure you want to plant this today?')){
  //     Plants.addGardenToPlant(plant, garden)
  //       .then(function(){
  //         that.getUserPlants()
  //         // Events.
  //       })
  //   }
  // }
  var date = new Date(Date.now());
  var year = date.getFullYear();
  var month = function(){
    if(date.getMonth()<10){
     return '0' + date.getMonth();
    } else{
     return date.getMonth();
    }
  };
  var day = function(){
    if(date.getDate()<10){
      return '0' + date.getDate();
    } else{
      return date.getDate();
    }
  };
  var hour = date.getHours();
  var minute = function(){
    if(date.getMinutes()<10){
      return '0' + date.getMinutes();
    } else{
      return date.getMinutes();
    }
  };
  var second = function(){
    if(date.getSeconds()<10){
      return '0' + date.getSeconds();
    } else{
      return date.getSeconds();
    }
  };
  var time = year+'-'+(month()+1)+'-'+day()+'T'+hour+':'+minute()+':'+second()+'Z';

  that.dropCallback = function(event, index, item, external, type){
    console.log(item)
    var plant = {plantId: item.plantId};
    var garden = {gardenName: item.bucket};

    if(confirm('Are you sure you want to plant this today?')){
      Plants.addGardenToPlant(plant, garden)
        .then(function(results){
          that.getUserPlants()
          var plantEvent = {};
          plantEvent.username = that.data.username;
          plantEvent.idOfPlant = plant.plantId;
          plantEvent.eventDate = time;
          // console.log(plantEvent, 'asjkdlfklasdfkljasfak;seiorwioeruweioruweioruioewuqeroiqurwer')
          Events.addPlantEvent(plantEvent)
            .then(function(results){
              console.log(results, 'PLANTEventCONTROLLER')
            })
        })
    }
     else{

    }

  };

  that.getUserPlants = function(){
    var tempArray = [];
    Plants.getUsersPlants(that.data)
      .then(function(results) {
        // console.log(results, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
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
              console.log(results, 'RESULTS IN DELETE GARDEN CONTROLLER');
              that.getUserPlants();

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

  // get current time and create reoccuring schedule
  that.function findWaterTime(plantLife, waterSched) { 
    var currentDate = moment().valueOf();
    var plantDate = currentDate;
    var results = [];
    var theWaterSched = [604800000/1,604800000/2,604800000/3];
    var endDate = moment().add(plantLife, 'days').valueOf();

    while(plantDate < endDate) {
      plantDate = plantDate + theWaterSched[waterSched - 1];
      results.push(plantDate);
    }

    return results;
  }

  that.function formDate (dates) {
    var results = [];
    for(var i = 0; i < dates.length; i++) {
      results.push(moment(dates[i]).format());
    }
    return results;
  }

  // that.formDate(that.findWaterTime(90, 1)));


  that.getUserPlants();

}]);
