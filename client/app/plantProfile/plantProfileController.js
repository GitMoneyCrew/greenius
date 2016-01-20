var plantProfile = angular.module('plantProfile', []);
plantProfile.controller('plantProfileController'['$scope', 'Plants', '$state', function($scope, Plants, $state){
    $scope.data = {};
    $scope.data.commonname = $state.params.commonname;
    // $state.go('myPlants', {username: 'lizz'});
    //make sure do $state.go
    console.log($scope.data.commonname) //TODO: Make sure this is what we want

    $scope.data.getSpecieInfoOfPlant = function(){
      Plants.getSpecieInfo($state.data).
        .then(function(data) {

        })
    }
    

}]);
