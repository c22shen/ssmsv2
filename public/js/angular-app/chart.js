angular
    .module('chart', [])
    .factory('d3', function() {
        return d3;
    })

.directive('chart', ["d3", "$rootScope", "$window",
    function(d3, $rootScope, $window) {
        function link(scope, el, attr) {
            el = el[0];
            var w, h;
            var height = 500,
                margin = 50;
            var svg = d3.select(el).append('svg');
            svg.style('background-color', 'rgb(0,0,0)');
            svg.attr({
                height: 500
            });
            var points = svg.append('g').attr('class', 'points').selectAll('g.point');
            console.log("link points is", points);
            var x = d3.scale.linear();
            var y = d3.scale.linear();
            var x_extent = d3.extent(scope.data, function(d, i) {
                return d.x_pos;
            });
            x.domain(x_extent);
            var y_max = d3.max(scope.data, function(d) {
                return d.y_pos
            });
            y.domain([0, y_max]);
            scope.$watch(function() {
                w = el.clientWidth;
                h = el.clientHeight;
                return w + h;
            }, resize);

            function resize() {
                console.log("Resize called");
                svg.attr({
                    width: w
                });
                x.range([margin, w - margin]);
                y.range([height - margin, margin]);
                update();
            }

            scope.$watch('statusArray', update);

            var update = function() {
                //update that point only
                // console.log($rootScope.statusArray);
                console.log("update called", scope.data);
                if (!scope.data) {
                    return;
                }
                points = points.data(scope.data);
                console.log("update points", points);
                



                var circle = points.enter()
                    .append('g')
                    .attr('class', 'point');

                circle.append('circle')
                    .attr('r', 20)
                    .attr('fill', function(d) {
                        return d.status === true ? "red" : "green"
                    });

                points.attr('transform', function(d, i) {
                    return 'translate(' + [x(d.x_pos), y(d.y_pos)] + ')';
                }).attr('fill', function(d) {
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
