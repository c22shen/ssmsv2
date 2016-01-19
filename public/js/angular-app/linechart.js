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
var data2 = [{
    "sale": "152",
    "year": "2000"
}, {
    "sale": "189",
    "year": "2002"
}, {
    "sale": "179",
    "year": "2004"
}, {
    "sale": "199",
    "year": "2006"
}, {
    "sale": "134",
    "year": "2008"
}, {
    "sale": "176",
    "year": "2010"
}];

                var width = 1000,
                    height = 500;

                var margins = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                };

                var donutWidth = 10;
                var freeCount = 4;
                var busyCount = 5;

                var svg_container = d3.select(el).append('svg');


                var xScale = d3.scale.linear().range([margins.left, width - margins.right]).domain([2000, 2010]);
                var yScale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([134, 215]);


                xAxis = d3.svg.axis()
                    .scale(xScale);

                yAxis = d3.svg.axis()
                    .scale(yScale);

                var svg = svg_container
                    .attr('width', width)
                    .attr('height', height)
                    .append("g");

svg.append("svg:g")
.attr("class","axis")
    .attr("transform", "translate(0," + (height - margins.bottom) + ")")
    .call(xAxis);


    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

    svg.append("svg:g")
    .attr("class","axis")
    // .attr("transform", "translate(" + (margins.left) + ",0)")
    .call(yAxis);


var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.sale);
  }).interpolate("basis");

  svg.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');



svg.append('svg:path')
  .attr('d', lineGen(data2))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
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
