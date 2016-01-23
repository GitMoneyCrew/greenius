var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController',['$scope', 'Plants', '$state','ProfileInfo', function($scope, Plants, $state, ProfileInfo){
    $scope.data = {};
    $scope.data.nickname = $state.params.nickname;

    $scope.getPlant = function(){
      Plants.getPlant($scope.data)
        .then(function(results) {
          // console.log(results);
          $scope.data.id =results.data.idOfSpecies;
          $scope.data.plantDate =results.data.plantDate;
          $scope.data.plantStatus = results.data.plantStatus;
          $scope.getSpecieInfoOfPlant();
        })
        .catch(function(error) {
          console.log(error)
        })
    };

    $scope.getSpecieInfoOfPlant = function(){
      Plants.getSpecieById($scope.data)
        .then(function(results) {
          // console.log(results);
          $scope.data.botanicalName = results.data.botanicalName;
          $scope.data.careGuide = results.data.careGuide;
          $scope.data.commonName = results.data.commonName;
          $scope.data.exposure = results.data.exposure;
          $scope.data.generalPlantInfo = results.data.generalInformation;
          $scope.data.plantPic = results.data.plantPic;
          $scope.data.wateringInformation = results.data.wateringInformation;
          $scope.data.typeOf = results.data.typeOf;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN GETSPECIEINFOOFPLANT CONTROLLER');
        })
    };

    //immediately called when controller is loaded
    $scope.getPlant();
}]);
