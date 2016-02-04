angular
    .module('ssms.app')
    .directive('piechart', ["d3", "$rootScope", "$window", "$interval",
    function(d3, $rootScope, $window, $interval) {
        function link(scope, el, attr) {
            el = el[0];
            var width = 150;
            var height = 150;
            var statusColor = function(label) {
                if (label === 'Free') {
                    return "#09f"
                } else {
                    return "#FFF"
                }
            }
            var donutWidth = 10;
            var radius = Math.min(width, height) / 2;
            var freeCount = 4;
            var busyCount = 5;



            var arc = d3.svg.arc()
                .innerRadius(radius - donutWidth) // NEW
                .outerRadius(radius);
            var dataset1 = [{
                label: 'Free',
                count: freeCount
            }, {
                label: 'Busy',
                count: busyCount
            }];

            var pie = d3.layout.pie()
                .value(function(d) {
                    return d.count;
                })
                .sort(null);
            var svg_container = d3.select(el).append('svg');
            var svg = svg_container
                .attr('width', width)
                .attr('height', height)
                .append("g")
                // .attr("id", "pieChart")
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

            var path = svg.selectAll('path')
                .data(pie(dataset1))
                .enter()
                .append('path');

            path.transition()
                .duration(500)
                .attr('fill', function(d, i) {
                    return statusColor(d.data.label);
                })
                .attr('d', arc)
                .each(function(d) {
                    this._current = d;
                });

            var radius;

            var freeDisplay = svg_container // NEW 
                .append('text') // NEW
                .attr('class', 'c3-chart-arcs-title')
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
            freeDisplay.text(freeCount);

            $interval(function() {
                freeCount = Math.floor((Math.random() * 10) + 1);
                busyCount = Math.floor((Math.random() * 10) + 1);
                dataset1 = [{
                    label: 'Free',
                    count: freeCount
                }, {
                    label: 'Busy',
                    count: busyCount
                }];
                path.data(pie(dataset1));
                path.transition().duration(750).attrTween("d", arcTween);

                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                        return arc(i(t));
                    };
                }
                freeDisplay.text(freeCount);

            }, 2000);


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
