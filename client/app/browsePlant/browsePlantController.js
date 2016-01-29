var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['Plants', 'ProfileInfo', '$state', function(Plants, ProfileInfo, $state) {
  var that = this;
  that.data = {};
    that.data.commonName = '';
    that.data.specieResults;
    that.data.nickname = '';
    that.data.username = ProfileInfo.profile.username;
    that.data.botanicalName = '';
    // TODO MAKE SURE PLANTDATE MATCHES CALENDAR AND DB
    that.data.plantDate = ProfileInfo.profile.plantDate;
    that.data.gardenName = '';
    that.data.plantArray = [];
    that.usersGardenArray = [];
    that.plantInfoPrompts = false;
    that.promptToAddPlant = false;
    that.gardenPrompt = false;
    that.showModal = false;
    that.tracker = false;

    that.getExistingGardens = function(){
      var gardenArray = [];
        Plants.getUserGardens(that.data)
          .then(function(results){
            for(var j = 0; j< results.length; j++){
              var garden = results[j].gardenName;
              if(gardenArray.indexOf(garden) === -1){
                gardenArray.push(garden);
              }
            }
            that.usersGardenArray = gardenArray;
          })
          .catch(function(error){
            console.log(error);
          });
    };
    that.getExistingGardens();

    var changeToPlantProfile = function(name){
      $state.go('navbar.plantProfile', {nickname: name});
    };

    that.goToPlant = function(name){
      that.data.nickname = name;
      changeToPlantProfile(that.data.nickname);
    };

    that.browse = function(){
      if(that.data.commonName){
        Plants.getSpecieInfo(that.data)
          .then(function(data){
            that.data.commonName = data.commonName;
            that.data.botanicalName = data.botanicalName;
            that.userWantsToAddPlant();
          })
          .catch(function(error){
            console.log(error);
            alert('Plant not found');
          });
       }
    };

    that.userWantsToAddPlant = function(){
      that.promptToAddPlant = !(that.promptToAddPlant);
    };

    that.userChoseGarden = function(){
      that.gardenPrompt = !(that.gardenPrompt);
    };

    that.specificPlantInfoPrompts = function(){
      that.plantInfoPrompts = !(that.plantInfoPrompts);
    };

    that.plantsInGardenTracker = function(){
      that.tracker = true;
    };

    that.selectGarden = function(){
      if(that.data.gardenName){
        if(that.data.usersGarden !== that.data.gardenName){
          Plants.addGarden(that.data)
            .then(function(results){
              that.getGardenPlants();
            })
            .catch(function(error){
              console.log(error);
            });
          }
        that.specificPlantInfoPrompts();
       }
    };

    that.getGardenPlants = function(){
        var nicknameArray= [];
        var plantDateArray = [];
        var plantStatusArray = [];
      Plants.getGardenPlants(that.data)
        .then(function(results) {
          for(var i = results.length-1; i>= 0; i--){
            var obj = {}
             obj.nickname = results[i].nickname;
             obj.id = i;
             Plants.getSpecieById(results[i])
              .then(function(results){
                obj.commonName = results.data.commonName;
                obj.plantPic = results.data.plantPic;
              })
              .catch(function(errror){
                console.log(error);
              });
            nicknameArray.push(obj);
          }
          that.nicknameArray = nicknameArray;
        })
        .catch(function(error){
          console.log(error);
        });
    };

    that.addPlant = function(){
      if(that.data.nickname){
        Plants.addPlant(that.data)
          .then(function(results){
            that.getGardenPlants();
            that.specificPlantInfoPrompts();
            that.userChoseGarden();
            that.userWantsToAddPlant();
            that.getExistingGardens();
            that.plantsInGardenTracker();
            that.data.botanicalName = '';
            that.data.commonName = '';
            that.data.nickname = '';
            that.data.plantDate = '';
          })
          .catch(function(error){
            console.log(error);
          });
      } else{
        alert('You must enter a plant');
      }
    };
}]);
