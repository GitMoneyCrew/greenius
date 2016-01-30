var myGarden = angular.module('myGarden',[]);
myGarden.controller('myGardenController', ['Plants', '$state', '$window',  function(Plants, $state, $window){
  var that = this;
  that.data = {};
  that.data.username = $state.params.username;
  that.data.username = $window.localStorage.getItem('username');
  that.data.gardenName = '';
  that.data.nickname;
  that.data.plantDate;
  that.data.plantStatus;
  that.data.idOfGarden;
  that.gardens = {};
  that.count = 0;
  that.resultPlants;
  that.lists;
  
  that.dropCallback = function(event, index, item, external, type){
    var plant = {plantId: item.plantId};
    var garden = {gardenName: item.bucket};
    Plants.addGardenToPlant(plant, garden)
  };

  that.getSpecifcGardenPlants = function(){
    if(that.data.gardenName){
      Plants.getGardenPlants(that.data)
        .then(function(results) {
          // console.log(results, 'SUCCESS IN getSpecifcGardenPlants CONTROLLER');
          that.resultPlants = results;
          that.count++;
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  };

  that.getUsersGardens = function(){
    Plants.getUserGardens(that.data)
      .then(function(results) {
        for(var i = 0; i < results.length; i++){
          that.gardens[results[i].id] = results[i].gardenName
        } 
        that.lists = that.setList(that.resultPlants)
        that.formatGardenForSandbox();
      })
      .catch(function(error) {
        console.log(error);
      })
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
          obj.idOfGarden  = results.data[i].idOfGarden;
          obj.plantId     = results.data[i].id;
          obj.speciesId   = results.data[i].idOfSpecies;
          tempArray.push(obj);
        }
        that.resultPlants = tempArray;
      })
      .catch(function(error) {
        console.log(error);
      });
  }; 

  that.deleteGarden = function(){
    if(that.data.gardenDelete){
      Plants.deleteGarden(that.data)
      .then(function(results) {
        console.log(results, 'RESULTS IN DELETE GARDEN CONTROLLER');
      })
      .catch(function(error){
        console.log(error, 'ERROR IN DELETE GARDEN CONTROLLER');
      })
    }
  };

  that.setList = function(arr) {
    var res = arr.reduce(function(obj, cur, i, array) {
      //if theres no garden id or that gardens been seen already, continue
      if (cur.idOfGarden === '' || obj[cur.idOfGarden]) { return obj } 
        obj[cur.idOfGarden] = { 
          label: that.gardens[cur.idOfGarden],
          plants: []
        }
        return obj
        //object to reduce to starts with area for unplanted plants
      }, { 0: { label: "To Plant!", plants: [] }} 
    );
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
  that.getUsersGardens();
  that.getSpecifcGardenPlants();

}]);
