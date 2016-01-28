var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['Plants','ProfileInfo','$state' ,function(Plants, ProfileInfo,$state){
  var that = this;
  that.data = {};
    that.data.commonName = '';
    that.data.specieResults;
    that.data.nickname = '';
    that.data.username = ProfileInfo.profile.username;
    that.data.botanicalName = '';
    // TODO need to fix for later w calendar stuff, for now itll be nursery
    that.data.plantStatus = 'nursery';
    // TODO need to tell user how to format
    that.data.plantDate = ProfileInfo.profile.plantDate;
    that.data.gardenName = '';
    that.data.plantArray = [];
    that.usersGardenArray = [];
    that.plantInfoPrompts = false;
    that.promptToAddPlant = false;
    that.gardenPrompt = false;
    that.showModal= false;
    that.tracker = false;

    // Gets all the gardens that belong the user to populate the existing garden table
    that.getExistingGardens = function(){
      var gardenArray = [];
        Plants.getUserGardens(that.data)
          .then(function(results) {
            // console.log(results, 'SUCCESS IN GETEXISTINGGARDS');
            for(var j = 0; j< results.length; j++){
              var garden = results[j].gardenName;
              if(gardenArray.indexOf(garden) === -1){
                gardenArray.push(garden);
              }
            }
            that.usersGardenArray = gardenArray;
          })
          .catch(function(error) {
            console.log(error);
          })
    };
    // invoke immediately when controller is loaded
    that.getExistingGardens();

    var changeToPlantProfile = function(name){
      $state.go('navbar.plantProfile', {nickname: name});
    };

    that.goToPlant = function(name){
      that.data.nickname = name;
      changeToPlantProfile(that.data.nickname);
    };

    // this will query the speciesInfo to get the plant they are interested in
    that.browse = function(){
      if(that.data.commonName){
        // console.log(that.data, 'CONSOLE.LOG BROWSEPLANT SCOPEDATAPLANT');
        Plants.getSpecieInfo(that.data)
          .then(function(data) {
            // console.log(data.commonName, data.botanicalName, 'BROWSE DATA')
            that.data.commonName = data.commonName;
            that.data.botanicalName = data.botanicalName;
            that.userWantsToAddPlant();
          })
          .catch(function(err) {
            console.log(err);
            alert('Plant not found');
          })
      }
    };

    //this is for the ng-if prompt, appears= if user wants to plant this plant
    that.userWantsToAddPlant = function(){
      that.promptToAddPlant = !(that.promptToAddPlant);
    };

    // this is for the ng-if prompt, appears = user choses which garden to add to
    that.userChoseGarden = function(){
      that.gardenPrompt = !(that.gardenPrompt);
    };

    //this is for the ng-if prompt, appears tell the user to name the plant and startdate
    that.specificPlantInfoPrompts = function(){
      that.plantInfoPrompts = !(that.plantInfoPrompts);
    };

    that.plantsInGardenTracker = function(){
      that.tracker = true;
    };

    // checks if the garden exists or not, if it doesnt then adds the Garden
    that.selectGarden = function(){
      if(that.data.gardenName){
        if(that.data.usersGarden != that.data.gardenName){
          //TODO check that user only inputed in one field
          Plants.addGarden(that.data)
            .then(function(results) {
              // console.log(results, 'SUCCESS IN SELECTGARDEN');
              that.getGardenPlants();
            })
            .catch(function(error) {
              console.log(error);
            })
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
          // console.log(results, 'SUCCESS IN GETGARDENPLANTS CONTROLLER');
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
              })
            nicknameArray.push(obj);
          }
          that.nicknameArray = nicknameArray;
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    //adds the plant to the database
    that.addPlant = function(){
      if(that.data.nickname){
        Plants.addPlant(that.data)
          .then(function(results){
            // console.log(results, 'SUCCESS IN ADDINPLANT ADDPLANT CONTROLLER');
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
          .catch(function(error) {
            console.log(error);
          })
      } else{
        alert('You must enter a plant');
      }
    };
}]);
