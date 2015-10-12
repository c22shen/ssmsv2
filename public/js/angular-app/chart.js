angular
    .module('app')
    .directive('myscatterChart', ["d3", 
    	function(d3){
    		return {
    			restrict: 'E',
    			scope: {

    			},
    			compile: function(element, attrs, transclude) {
    				var svg = d3.select(element[0]).append('svg');
    				return function(scope, element, attrs){};
    			}
    		};

    	}]);