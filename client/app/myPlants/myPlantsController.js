var myPlants = angular.module('myPlants', []);
myPlants.controller('myPlantsController', ['Plants', '$state', '$window', function(Plants, $state, $window){
  var that = this;
  that.data = {};
    that.data.username = $window.localStorage.getItem('username');
    that.data.plantDelete = '';
    that.data.gardenName = '';
    that.data.nickname;
  that.gardenArray = [];
  that.count = 0;


  var changeState = function(plant){
    $state.go('navbar.plantProfile', {nickname: plant});
  };

  that.deletePlant = function(){
    if(that.data.plantDelete){
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
    }
  };

  that.goToPlant = function(name){
    that.data.nickname = name;
    changeState(that.data.nickname);
  };

  that.getSpecifcGardenPlants = function(){
    if(that.data.gardenName){
      Plants.getGardenPlants(that.data)
        .then(function(results){
          that.resultPlants = results;
          that.count++;
        })
        .catch(function(error){
          console.log(error);
        });
    }
  };

  that.getUsersGardens = function(){
    Plants.getUserGardens(that.data)
      .then(function(results){
        for(var i = 0; i< results.length; i++){
          var temp = results[i].gardenName;
          if(that.gardenArray.indexOf(temp) === -1){
            that.gardenArray.push(temp);
          }
        }
      })
      .catch(function(error){
        console.log(error);
      });
  };
  that.getUsersGardens();

  that.getUserPlants = function(){
    var tempArray = [];
    Plants.getUsersPlants(that.data)
          .then(function(results){
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
              tempArray.push(obj);
            }
            that.resultPlants = tempArray;
          })
          .catch(function(error){
            console.log(error);
          });
  };
  that.getUserPlants();

}]);
