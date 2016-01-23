var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['$scope', 'Plants','ProfileInfo','$state' ,function($scope, Plants, ProfileInfo,$state){
  $scope.data = {};
    $scope.data.commonName = '';
    $scope.data.specieResults;
    $scope.data.nickname = '';
    $scope.data.username = ProfileInfo.profile.username;
    $scope.data.botanicalName = '';
    // TODO need to fix for later w calendar stuff, for now itll be nursery
    $scope.data.plantStatus = 'nursery';
    // TODO need to tell user how to format
    $scope.data.plantDate = ProfileInfo.profile.plantDate;
    $scope.data.gardenName = '';
    $scope.data.plantArray = [];
    $scope.usersGardenArray = [];
    $scope.plantInfoPrompts = false;
    $scope.promptToAddPlant = false;
    $scope.gardenPrompt = false;
    $scope.showModal= false;
    $scope.tracker = false;

    // Gets all the gardens that belong the user to populate the existing garden table
    $scope.getExistingGardens = function(){
      var gardenArray = [];
        Plants.getUserGardens($scope.data)
          .then(function(results) {
            // console.log(results, 'SUCCESS IN GETEXISTINGGARDS');
            for(var j = 0; j< results.length; j++){
              var garden = results[j].gardenName;
              if(gardenArray.indexOf(garden) === -1){
                gardenArray.push(garden);
              }
            }
            $scope.usersGardenArray = gardenArray;
          })
          .catch(function(error) {
            console.log(error);
          })
    };
    // invoke immediately when controller is loaded
    $scope.getExistingGardens();

    var changeToPlantProfile = function(name){
      $state.go('plantProfile', {nickname: name});
    };

    $scope.goToPlant = function(name){
      $scope.data.nickname = name;
      changeToPlantProfile($scope.data.nickname);
    };

    // this will query the speciesInfo to get the plant they are interested in
    $scope.browse = function(){
      if($scope.data.commonName){
        // console.log($scope.data, 'CONSOLE.LOG BROWSEPLANT SCOPEDATAPLANT');
        Plants.getSpecieInfo($scope.data)
          .then(function(data) {
            // console.log(data.commonName, data.botanicalName, 'BROWSE DATA')
            $scope.data.commonName = data.commonName;
            $scope.data.botanicalName = data.botanicalName;
            $scope.userWantsToAddPlant();
          })
          .catch(function(err) {
            console.log(err);
          })
      }
    };

    //this is for the ng-if prompt, appears= if user wants to plant this plant
    $scope.userWantsToAddPlant = function(){
      $scope.promptToAddPlant = !($scope.promptToAddPlant);
    };

    // this is for the ng-if prompt, appears = user choses which garden to add to
    $scope.userChoseGarden = function(){
      $scope.gardenPrompt = !($scope.gardenPrompt);
    };

    //this is for the ng-if prompt, appears tell the user to name the plant and startdate
    $scope.specificPlantInfoPrompts = function(){
      $scope.plantInfoPrompts = !($scope.plantInfoPrompts);
    };

    $scope.plantsInGardenTracker = function(){
      $scope.tracker = true;
    };

    // checks if the garden exists or not, if it doesnt then adds the Garden
    $scope.selectGarden = function(){
      if($scope.data.gardenName){
        if($scope.data.usersGarden != $scope.data.gardenName){
          //TODO check that user only inputed in one field
          Plants.addGarden($scope.data)
            .then(function(results) {
              // console.log(results, 'SUCCESS IN SELECTGARDEN');
              $scope.getGardenPlants();
            })
            .catch(function(error) {
              console.log(error);
            })
        }
        $scope.specificPlantInfoPrompts();
      }
    };

    $scope.getGardenPlants = function(){
        var nicknameArray= [];
        var plantDateArray = [];
        var plantStatusArray = [];
      Plants.getGardenPlants($scope.data)
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
          $scope.nicknameArray = nicknameArray;
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    //adds the plant to the database
    $scope.addPlant = function(){
      if($scope.data.nickname){
        Plants.addPlant($scope.data)
          .then(function(results){
            // console.log(results, 'SUCCESS IN ADDINPLANT ADDPLANT CONTROLLER');
            $scope.getGardenPlants();
            $scope.specificPlantInfoPrompts();
            $scope.userChoseGarden();
            $scope.userWantsToAddPlant();
            $scope.plantsInGardenTracker();
            $scope.data.botanicalName = '';
          })
          .catch(function(error) {
            console.log(error);
          })
      } else{
        alert('You must enter a plant');
      }
    };
}]);
