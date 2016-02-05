var myPlants = angular.module('myPlants', []);
myPlants.controller('myPlantsController', ['Plants', 'Events' '$state', '$window', '$q', function(Plants, Events $state, $window, $q){
  var that = this;
  that.data = {};
    that.data.username = $window.localStorage.getItem('username');
    that.data.plantDelete = '';
    that.data.gardenName = '';
    that.data.nickname;
    that.data.plants;
  that.count = 0;
  that.plantPromise = [];

  var changeState = function(plant){
    $state.go('navbar.plantProfile', {nickname: plant});
  };

  that.deletePlant = function(){
    if(that.data.plantDelete){
      var plant = {nickname: that.data.plantDelete}
      Plants.getPlant(plant)
        .then(function(results){
            var plantEvent = {
              idOfPlant: results.data.id,
            };
          console.log(plantEvent, 'WEWEWE')
          Events.removeAllPlantEvents(plantEvent)
            .then(function(eventResults){
              console.log(eventResults, 'HEY@#$')
              Plants.deletePlant(that.data)
                .then(function(results){
                  if(that.data.gardenName){
                    that.getSpecifcGardenPlants();
                  } else{
                    that.getUserPlants();
                  }
                })
                .catch(function(error){
                  console.log(error);
                });
            })
        })
    }
  };
  // that.removeEvents = function(plantObj, eventDate){
  //   plantObj.eventDate = eventDate;
  //   console.log(plantObj, 'HEY GURL')
  //   Events.removePlantEvent(plantObj)
  //     .then(function(results){
  //       console.log(results, 'SUCCESS IN REMOVEEVENT CONTROLLER');
  //       return results;
  //     })
  //     .catch(function(error){
  //       console.log(error, 'ERROR IN REMOVEEVNT CONTROLLER')
  //     })
  // }
  // that.deletePlant = function(){
  //   if(that.data.plantDelete){
  //     Plants.deletePlant(that.data)
  //       .then(function(results){
  //         if(that.data.gardenName){
  //           that.getSpecifcGardenPlants();
  //         } else{
  //           that.getUserPlants();
  //         }
  //       })
  //       .catch(function(error){
  //         console.log(error);
  //       });
  //   }
  // };

  that.goToPlant = function(name){
    that.data.nickname = name;
    changeState(that.data.nickname);
  };

  that.getSpecieInfo = function(plant){
    return Plants.getSpecieById(plant)
      .then(function(speciesResult){
        var obj = plant;
        obj.speciesInfo = speciesResult.data;
        that.plantPromise.push(obj);
      })
      .catch(function(error){
        console.log(error);
      });
  };

  that.getAllPlantsSpeciesInfo = function(array){
    var plantData = [];
    for(var i = 0; i < array.length; i++){
      plantData.push(that.getSpecieInfo(array[i]));
    }
    $q.all(plantData).then(function(){
      that.data.plants = that.plantPromise;
      // console.log('That data: ', that.data.plants);
    })
  };

  that.getUserPlants = function(){
    var plantArray;
    Plants.getUsersPlants(that.data)
      .then(function(plantResults){
        plantArray = plantResults.data;
        that.getAllPlantsSpeciesInfo(plantArray);
      })
      .catch(function(error){
        console.log(error);
      });
  };
  that.getUserPlants();

}]);
