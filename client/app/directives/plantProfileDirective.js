var plantProfileDirective = angular.module('plantProfileDirective', []);
plantProfileDirective.directive('profile', function(){
	return {
		restrict: 'E',
		scope: {nickname: '='},
		template: '<div class="panel panel-default">{{nickname}}<div class="panel-body"></div></div>',
		controller: function($scope, $element, $attrs) {
			console.log('This is the attrs ', $attrs);
			console.log('This is the scope ', $scope);
		}			
	}
});