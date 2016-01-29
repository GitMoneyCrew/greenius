var dashboard = angular.module('dashboard', []);
dashboard.controller('dashboardController', ['Plants', 'ProfileInfo', function(Plants, ProfileInfo){
  var that = this;
  that.data = {};
    that.data.username = ProfileInfo.profile.username;
    that.data.plants = [];
  that.totalFlowers = 0;
  that.totalHousePlants = 0;
  that.totalFruits = 0;
  that.totalVegetables = 0;
  that.totalHerbs = 0;
  that.totalShrubs = 0;
  that.total_Flowers_HousePlant = 0;
  that.total_Fruits_Vegetables = 0;
  that.total_Herbs_Shrubs = 0;

  that.getSpecieInfo = function(index, plant){
    Plants.getSpecieById(plant)
      .then(function(speciesResult){
        that.data.plants[index].speciesInfo = speciesResult.data;
        that.getPlantStats();
      })
      .catch(function(error){
        console.log(error);
      });
  };

  that.getAllPlantsSpeciesInfo = function(array){
    for(var i = 0; i < array.length; i++){
      that.getSpecieInfo(i, array[i]);
    }
  };

  that.getUserPlants = function(){
    Plants.getUsersPlants(that.data)
      .then(function(plantResults){
        that.data.plants = plantResults.data;
        that.getAllPlantsSpeciesInfo(that.data.plants);
      })
      .catch(function(error){
        console.log(error);
      });
  };

  that.getUserPlants();

  that.getPlantStats = function(){
    for(var i = 0; i < that.data.plants.length; i++){
      var curSpeciesType = that.data.plants[i].speciesInfo;
      if(curSpeciesType.typeOf === 'Flower'){
        that.totalFlowers++;
      }
      if (curSpeciesType.typeOf === 'Houseplant'){
        that.totalHousePlants++;
      }
      if (curSpeciesType.typeOf === 'Fruit'){
        that.totalFruits++;
      }
      if (curSpeciesType.typeOf === 'Vegetable'){
        that.totalVegetables++;
      }
      if (curSpeciesType.typeOf === 'Herb'){
        that.totalHerbs++;
      }
      if (curSpeciesType.typeOf === 'Shrub'){
        that.totalShrubs++;
      }
    }
    that.total_Flowers_HousePlant = that.totalFlowers + that.totalHousePlants;
    that.total_Fruits_Vegetables = that.totalFruits + that.totalVegetables;
    that.total_Herbs_Shrubs = that.totalHerbs + that.totalShrubs;
  };

}]);
