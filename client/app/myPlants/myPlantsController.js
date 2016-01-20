var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $stateParams, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  // make sure to do state.go

  $scope.data.username = ProfileInfo.profile.username;
  console.log($scope.data.username); //TODO: Make sure this is what we want
  $scope.data.plants;

  // $scope.goToPlant = function(plant){
  //   $state.go('plantProfile', {commonname: plant});
  // }

  $scope.getUserPlants = function(){
    Plants.getUserPlants($scope.data)
          .then(function(resultData) {
            $scope.data.plants = resultData;
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  };

  
}]);
