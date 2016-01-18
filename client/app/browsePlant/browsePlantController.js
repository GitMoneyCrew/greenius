var browsePlant = angular.module('browsePlant', []);
browsePlant.controller('browsePlantController', ['$scope', 'Plants', function($scope, Plants){
  $scope.data = {};

  // TODO finalize how plant will be passed in based on view input and put it on $scope
    $scope.data.plant = '';
    $scope.data.garden = '';

  //TODO call this function inside the view when submit the plant you want to add
  $scope.addPlant = function(){
    if($scope.data.plant){
      Plants.addPlant($scope.data);
    } else{
      alert('You must enter a plant');
    }
  }
}]);
