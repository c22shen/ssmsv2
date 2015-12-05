angular
    .module('chart', [])
    .factory('d3', function() {
        return d3;
    })

.directive('chart', ["d3", "$rootScope", "$window",
    function(d3, $rootScope, $window) {
        function link(scope, el, attr) {
            var sam = 9;
            el = el[0];
            var w, h;
            var height = 500,
                margin = 50;
            var svg = d3.select(el).append('svg');
            svg.style('background-color', 'rgb(0,0,0)');
            svg.attr({
                height: height
            });


            var points = svg.append('g').attr('class', 'points').selectAll('g.point');
            var x = d3.scale.linear();
            var y = d3.scale.linear();

            if (!!scope.data) {
                var x_extent = d3.extent(scope.data, function(d, i) {
                    return d.x_pos;
                });
                x.domain(x_extent);
                var y_max = d3.max(scope.data, function(d) {
                    return d.y_pos
                });
                y.domain([0, y_max]);

            }


            scope.$watch(function() {
                w = el.clientWidth;
                h = el.clientHeight;
                return w + h;
            }, resize);

            function resize() {
                svg.attr({
                    width: w
                });
                x.range([margin, w - margin]);
                y.range([height - margin, margin]);
                update();
            }

            scope.$watch('data', function(newVal, oldVal) {
                update();
            }, true);

            var update = function() {

                if (!scope.data || scope.data.length === 0) {
                    return;
                }


                points = points.data(scope.data);
                    var x_extent = d3.extent(scope.data, function(d, i) {
                        return d.x_pos;
                    });
                    x.domain(x_extent);
                    var y_max = d3.max(scope.data, function(d) {
                        return d.y_pos
                    });
                    y.domain([0, y_max]);

                var circle = points.enter()
                    .append('g')
                    .attr('class', 'point');

                circle.append('circle').attr('r', 20);
                points.attr('transform', function(d, i) {
                    return 'translate(' + [x(d.x_pos), y(d.y_pos)] + ')';
                })

                points.attr('fill', function(d) {
                    return d.status === true ? "red" : "green"
                });
                points.exit().remove();
            };
        };
        return {
            link: link,
            restrict: 'E',
            scope: {
                data: '='
            }
        };

    }
]);
