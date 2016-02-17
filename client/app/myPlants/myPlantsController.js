var myPlants = angular.module('myPlants', []);
myPlants.controller('myPlantsController', ['Plants', 'Events', '$state', '$window', '$q', function(Plants, Events, $state, $window, $q) {
  var that = this;
  that.data = {};
    that.data.username = $window.localStorage.getItem('username');
    that.data.plantDelete = '';
    that.data.gardenName = '';
    that.data.nickname;
    that.data.plants;
  that.count = 0;
  that.plantPromise = [];

  var changeState = function(plant) {
    $state.go('navbar.plantProfile', {nickname: plant});
  };

  that.goToPlant = function(name) {
    that.data.nickname = name;
    changeState(that.data.nickname);
  };

  that.getSpecieInfo = function(plant) {
    return Plants.getSpecieById(plant)
      .then(function(speciesResult) {
        var obj = plant;
        obj.speciesInfo = speciesResult.data;
        that.plantPromise.push(obj);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  that.getAllPlantsSpeciesInfo = function(array) {
    var plantData = [];
    for(var i = 0; i < array.length; i++) {
      plantData.push(that.getSpecieInfo(array[i]));
    }
    $q.all(plantData).then(function() {
      that.data.plants = that.plantPromise;
    })
  };

  that.getUserPlants = function() {
    var plantArray;
    Plants.getUsersPlants(that.data)
      .then(function(plantResults) {
        plantArray = plantResults.data;
        that.getAllPlantsSpeciesInfo(plantArray);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  that.getUserPlants();

}]);
