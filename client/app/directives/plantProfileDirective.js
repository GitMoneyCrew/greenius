var plantProfileDirective = angular.module('plantProfileDirective', []);
plantProfileDirective.directive('profile', function() {
	return {
		restrict: 'E',
		scope: { plant: '=',
						goplant: '='},
		templateUrl: './app/directives/profileDirectiveView.html',
		controller: function($scope, $element, $attrs) {
		}
	}
});
