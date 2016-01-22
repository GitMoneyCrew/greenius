var myPlants = angular.module('myPlants',[]);
myPlants.controller('myPlantsController', ['$scope', 'Plants', '$state', 'ProfileInfo',  function($scope, Plants, $stateParams, ProfileInfo){
  $scope.data = {};
  // $scope.data.username = $state.params.username;
  // make sure to do state.go

  $scope.data.username = ProfileInfo.profile.username;
  console.log($scope.data.username); //TODO: Make sure this is what we want
  // $scope.data.plants;

  $scope.goToPlant = function(plant){
    $state.go('plantProfile', {nickname: plant});
  };

  $scope.getUserPlants = function(){
    Plants.getUsersPlants($scope.data)
          .then(function(resultData) {
            $scope.data.resultPlants = resultData;
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  };

  // immediately calls this function when controller loads
 $scope.getUserPlants();

}]);
