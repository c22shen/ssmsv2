angular
    .module('ssms.app')
    .directive('linechart', ["d3", "$rootScope",
        function(d3, $rootScope) {
            function link(scope, el, attr) {
                el = el[0];
                console.log("linechart is here");
                var data = [{
                    "sale": "202",
                    "year": "2000"
                }, {
                    "sale": "215",
                    "year": "2001"
                }, {
                    "sale": "179",
                    "year": "2002"
                }, {
                    "sale": "199",
                    "year": "2003"
                }, {
                    "sale": "134",
                    "year": "2003"
                }, {
                    "sale": "176",
                    "year": "2010"
                }];


                var width = 1000,
                    height = 500;

                var MARGINS = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                };

                var donutWidth = 10;
                var freeCount = 4;
                var busyCount = 5;

                var svg_container = d3.select(el).append('svg');


                var xScale = d3.scale.linear().range([MARGINS.left, width - MARGINS.right]).domain([2000, 2010]);
                var yScale = d3.scale.linear().range([height - MARGINS.top, MARGINS.bottom]).domain([134, 215]);


                // xAxis = d3.svg.axis()
                //     .scale(xScale);

                // yAxis = d3.svg.axis()
                //     .scale(yScale);

                // var svg = svg_container
                //     .attr('width', width)
                //     .attr('height', height)
                //     .append("g");

                // svg.append("svg:g").call(xAxis);

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
