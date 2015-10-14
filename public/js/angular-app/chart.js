angular
    .module('myChart', [])
    .factory('d3', function() {
    	return d3;
    })

    .directive('myScatterChart', ["d3", 
    	function(d3){

            var draw = function(svg, width, height, data){
                var margin = 30;

                svg.select('.data')
                .selectAll('circle').data(data)
                .enter()
                .append('circle');

                svg.select('.data')
                .selectAll('circle').data(data)
                .attr('r', 10)
                .attr('cx', 50)
                .attr('cy', 100);

                // var xScale = d3.time.scale()
                //     .domain([
                //             d3.min(data, function(d) {
                //                 return d.time;
                //             }),
                //             d3.max(data, function(d){
                //                 return d.time;
                //             })
                //         ])
                //     .range([margin, width-margin]);

                //     var xAxis = d3.svg.axis()
                //         .scale(xScale)
                //         .orient('top')
                //         .tickFormat(d3.time.format('%S'));

                //     var yScale = d3.time.scale()
                //         .domain([0, d3.max(data, function(d) { return d.visitors;})])
                //         .range([margin, height-margin]);

                //     var yAxis = d3.svg.axis()
                //         .scale(yScale)
                //         .orient('left')
                //         .tickFormat(d3.format('f'));

                //     svg.select('.x-axis')
                //         .attr('transform', "translate(0, " + margin + ")")
                //         .call(xAxis);
                //     svg.select('.y-axis')
                //         .attr('transform', "translate(0, " + margin + ")")
                //         .call(yAxis);

                svg
                    .attr('width', width)
                    .attr('height', height);
            };

    		return {
    			restrict: 'E',
    			scope: {
                    data: '='
    			},
    			compile: function(element, attrs, transclude) {
    				var svg = d3.select(element[0]).append('svg');
                    svg.append('g').attr('class', 'data');
                    svg.append('g').attr('class', 'x-axis axis');
                    svg.append('g').attr('class', 'y-axis axis');
                    var width = 600, height = 300;

    				return function(scope, element, attrs){

                        scope.$watch('data', function(newVal, oldVal, scope){
                            draw(svg, width, height, scope.data);
                        }, true)
                    };
    			}
    		};

    	}]);