var dashboard = angular.module('dashboard', []);
dashboard.controller('dashboardController', ['$scope', 'Plants', function($scope, Plants){
	$scope.userPlantsData = {};
	$scope.user = {
	  username: 'Robert',
	  password: 'SWISS',
	  email: 'robertstuartcardiff@gmail.com',
	  location: '',
	  userPic: 'http://facebookcraze.com/wp-content/uploads/2009/12/funny_profile_pic_for_facebook_rape.jpg',
	  createdAt: '',
	  updatedAt: ''
	};

	$scope.getUserPlants = function(){
    Plants.getUsersPlants($scope.user)
          .then(function(resultData) {
            $scope.userPlantsData.resultPlants = resultData;
          })
          .catch(function(error) {
            console.log(error, 'ERROR IN GETUSERPLANTS CONTROLLER');
          });
  };
  // immediately calls this function when controller loads
 	$scope.getUserPlants();
 	console.log('This is the plant list ', $scope.userPlantsData.resultPlants.forEach());

 	// $scope.totalPlants = function() {
 	// 	var plants = $scope.userPlantsData.resultPlants
 	// }

}]);