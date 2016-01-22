var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController',['$scope', 'Plants', '$state', function($scope, Plants, $state){
    $scope.data = {};
    $scope.data.nickname = $state.params.nickname;
    $scope.data.generalPlantInfo;
    console.log($scope.data.nickname, 'NICKNAME') //TODO: Make sure this is what we want
    $scope.data.specificPlantInfo;
    $scope.data.generalPlantInfo;

    // TODO probably will need only either getPlant or getSpecieInfoOfPlant but just see what each returns
    $scope.getPlant = function(){
      Plants.getPlant($scope.data)
        .then(function(getPlantData) {
          console.log(getPlantData, 'TODO GET WHAT YOU NEED FROM THE DATA GETPLANT');
          $scope.data.specificPlantInfo = getPlantData;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN GETPLANT CONTROLLER')
        })
    };

    $scope.getSpecieInfoOfPlant = function(){
      Plants.getSpecieInfo($scope.data)
        .then(function(getSpecieInfoOfPlantdata) {
          console.log(getSpecieInfoOfPlantdata, 'TODO GET WHAT YOU NEED FROM THE DATA GETSPECIEINFOOFPLANT');
          $scope.data.generalPlantInfo = getSpecieInfoOfPlantdata;
        })
        .catch(function(error) {
          console.log(error, 'ERROR IN GETSPECIEINFOOFPLANT CONTROLLER');
        })
    };

    //immediately called when controller is loaded
    $scope.getSpecieInfoOfPlant();
    $scope.getPlant();


}]);
