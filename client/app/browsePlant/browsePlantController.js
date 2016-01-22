var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['$scope', 'Plants','ProfileInfo',function($scope, Plants, ProfileInfo){
  $scope.data = {};

  // TODO finalize how plant will be passed in based on view input and put it on $scope
    $scope.data.commonName = '';
    $scope.data.specieResults;
    $scope.data.nickname = '';
    $scope.data.username = ProfileInfo.profile.username;
    $scope.data.gardenName = ProfileInfo.profile.gardenName;
    $scope.data.botanicalName;
    $scope.plantInfoPrompts = false;
    $scope.promptToAddPlant = false;
    // TODO need to fix for later w calendar stuff, for now itll be true
    $scope.data.plantStatus = true;
    // TODO need to tell user how to format
    $scope.data.plantDate = '';


    // TODO call this when you want to query out scraped data
    $scope.browse = function(){
      if($scope.data.commonName){
        console.log($scope.data, 'CONSOLE.LOG BROWSEPLANT SCOPEDATAPLANT');
        Plants.getSpecieInfo($scope.data)
          .then(function(data) {
            console.log(data.commonName, data.botanicalName, 'BROWSE DATA')
            $scope.data.commonName = data.commonName;
            $scope.data.botanicalName = data.botanicalName;
            $scope.userWantsToAddPlant();
          })
          .catch(function(err) {
            console.log(err, 'ERROR IN BROWSE FUNCTION')
          })
      }
    };

    $scope.userWantsToAddPlant = function(){
      $scope.promptToAddPlant = !($scope.promptToAddPlant);
      console.log("TO SHOW BUTTON ADDPLANT QUEST",$scope.promptToAddPlant);
    };

    $scope.specificPlantInfoPrompts = function(){
      $scope.plantInfoPrompts = !($scope.plantInfoPrompts);
      console.log("TO SHOW FIELDS $scope.plantInfoPrompts",$scope.plantInfoPrompts);
    }

  // call this function inside the view when submit the plant you want to add
  //TODO: TEST WHEN WE HAVE users in our database
  $scope.addPlant = function(){
    console.log($scope.data, 'CONSOLE.LOG ADDPLANT SCOPEDATAPLANT')
    if($scope.data.nickname){
      Plants.addPlant($scope.data);
      // resets value, in case user wants to add another plant
      // $scope.promptToAddPlant = false;
    } else{
      alert('You must enter a plant');
    }
  };

}]);
