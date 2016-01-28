var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['Plants', '$state', 'ProfileInfo',  function(Plants, $state, ProfileInfo){
  var that = this;
  that.data = {};
  // that.data.username = $state.params.username;
  that.data.username = ProfileInfo.profile.username;
  that.data.gardenName = '';
  that.data.nickname;
  that.gardenArray=[];
  that.count = 0;
  that.data.plantDelete = '';

  var changeState = function (plant){
    $state.go('navbar.plantProfile', {nickname: plant});
  };

  that.deletePlant = function(){
    if(that.data.plantDelete){
      Plants.deletePlant(that.data)
        .then(function(results){
          console.log(results, 'RESULTS IN DELETE PLANT CONTROLLER');
        })
        .catch(function(error){
          console.log(error, 'ERROR IN DELETE PLANT CONTROLLER');
        })
    }
  };

  that.goToPlant = function(name){
    that.data.nickname = name;
    changeState(that.data.nickname);
  };

  that.getSpecifcGardenPlants= function(){
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
        // console.log(results, 'SUCCES IN GETUSERSGARDENS CONTROLLER');
        for(var i = 0; i< results.length; i++){
          var temp = results[i].gardenName;
          if(that.gardenArray.indexOf(temp)===-1){
            that.gardenArray.push(temp);
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      })
  };

  that.getUserPlants = function(){
    var tempArray = [];
    Plants.getUsersPlants(that.data)
          .then(function(results) {
            // console.log(results.data, 'SUCCESS IN GETUSERPLANTS CONTROLLER');
            for(var i = 0 ; i < results.data.length; i++){
              var obj = {};
              obj.nickname = results.data[i].nickname;
              tempArray.push(obj);
            }
            that.resultPlants = tempArray;
          })
          .catch(function(error) {
            console.log(error);
          });
  };

  // immediately calls this function when controller loads
 that.getUserPlants();
 that.getUsersGardens();
}]);
