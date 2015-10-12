angular
    .module('myChart', [])
    .factory('d3', function() {
    	return d3;
    })

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