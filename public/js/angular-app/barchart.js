angular
    .module('chart')
    .directive('barchart', ["d3", "$rootScope", "$window",
        function(d3, $rootScope, $window) {
            function link(scope, el, attr) {
                el = el[0];
                var w, h;
                var xAxis, yAxis;
                var height = 500,
                    w = 500,
                    outerMargin = 50,
                    innerMargin = 5;
                upperMargin = 30;
                lowerMargin = 30;
                // margin=5;
                var svg = d3.select(el).append('svg');
                svg.style('background-color', 'black');
                // svg.attr({
                //     width: 500
                // });
                svg.attr({
                    height: 500
                });



                var bars = svg.append('g').attr('class', 'bars');

                bars.attr('transform', function(d, i) {
                    return 'translate(' + [0, upperMargin * 0.8] + ')';
                })

                var x = d3.scale.linear();
                var y = d3.scale.linear();
                // var barWidth = (width-margin*2.0)/scope.data.length; 



                var y_max = d3.max(scope.data, function(d) {
                    return d;
                });
                y.domain([0, y_max]);

                y.range([height - upperMargin - lowerMargin, 0]);

                var newBar = bars.selectAll('g.rect').data(scope.data);
                var newBar = newBar.enter();

                var newBar = newBar.append('g').append('rect');
                newBar.attr('fill', 'rebeccapurple');
                // newBar.attr('x', function(d, i) {
                //     return x(i);
                // });
                xAxis = svg.append('g')
                    .attr('class', 'xaxis')
                    .attr('fill', 'white');

                yAxis = svg.append('g')
                    .attr('class', 'yaxis')
                    .attr('fill', 'white');


                newBar.attr('y', function(d, i) {
                    return y(d);
                })

                newBar.attr('height', function(d, i) {
                    return height - upperMargin - lowerMargin - y(d);
                    // return d;
                })


                scope.$watch(function() {
                    w = el.clientWidth;
                    h = el.clientHeight;
                    return w + h;
                }, resize);

                function resize() {
                    svg.attr({
                        width: w
                    });
                    outerMargin = w * 0.1;
                    innerMargin = w * 0.02;
                    // x.range([margin, w - margin]);
                    // x.range([outerMargin, w - outerMargin - barWidth]);
                    var tickSize = (w - 2.0 * outerMargin) / (scope.data.length + 1);
                    var barWidth = (w * 1.0 - 2 * tickSize - 2 * outerMargin - (scope.data.length - 1) * innerMargin) / scope.data.length;

                    var x_extent = d3.extent(scope.data, function(d, i) {
                        return i;
                    });
                    x.domain([d3.min(scope.data) - 1, scope.data.length + 1]);
                    // x.range([outerMargin+barWidth/2, w - outerMargin-barWidth/2]);
                    x.range([outerMargin, w - outerMargin]);

                    newBar.attr('x', function(d, i) {
                        return x(i + 1);
                    });
                    newBar.attr('width', function(d, i) {

                        return barWidth;

                    })

                    newBar.attr('transform', function(d, i) {
                        return 'translate(' + [-barWidth / 2, 0] + ')';
                    })

                    xAxis = d3.svg.axis().scale(x).orient('bottom');
                    xAxis.tickFormat(d3.format("d"));

                    yAxis = d3.svg.axis().scale(y).orient('left');
                    yAxis.tickFormat(d3.format("d"));

                    d3.select('.xaxis').call(xAxis);
                    d3.select('.yaxis').call(yAxis);

                    d3.select('.xaxis').attr('transform', function(d, i) {
                        return 'translate(' + [0, height - lowerMargin] + ')';
                    })

                    d3.select('.yaxis').attr('transform', function(d, i) {
                    return 'translate(' + [outerMargin, upperMargin * 0.8] + ')';
                })
                }

            }




            return {
                link: link,
                restrict: 'E',
                scope: {
                    data: '='
                }
            };

        }
    ]);
