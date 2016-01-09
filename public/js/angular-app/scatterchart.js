angular
    .module('chart', [])
    .factory('d3', function() {
        return d3;
    })

.directive('scatterchart', ["d3", "$rootScope", "$window",
    function(d3, $rootScope, $window) {
        function link(scope, el, attr) {
            el = el[0];
            var w, h;
            // var height = 500,
               // var margin = 50;
            var svg = d3.select(el).append('svg');
            svg.style({'height': 0, 
                        'padding': 0,
                        'padding-bottom': '139.6%', 
                        'background-image': "url('/images/labinverted.png')",
                        'background-position': 'center center',
                        'background-size': '100%',
                        'background-repeat': 'no-repeat',
                        'background-color': '#67C3FF'
        });
            // 'background-color': '#2980B9'


// background-image: url('/images/lab.png'); background-position: center center;
//     <!-- background-size: 100%;  -->

//     height: 0;
//     padding: 0; /* remove any pre-existing padding, just in case */
//     padding-bottom: 124.2%; /* for a 4:3 aspect ratio */
//     <!-- background-image: url(foo.png); -->
//     background-position: center center;
//     background-size: 100%;
//     background-repeat: no-repeat;
//     background-color: #2980B9;



            // svg.attr({
            //     height: height
            // });

            // var office = svg.append('g').classed('office', true).append('rect').attr({
            //     x: "500", 
            //     y:"20", 
            //     width:"250", 
            //     height:"150"
            // }).style("fill", "blue");

            // var workstation1 = svg.append('g').classed('workstation', true).append('rect').attr({
            //     x: "100", 
            //     y:"400", 
            //     width:"150", 
            //     height:"40"
            // }).style("fill", "blue");

            // var workstation2 = svg.append('g').classed('workstation', true).append('rect').attr({
            //     x: "100", 
            //     y:"320", 
            //     width:"150", 
            //     height:"40"
            // }).style("fill", "blue");

            // var workstation3 = svg.append('g').classed('workstation', true).append('rect').attr({
            //     x: "100", 
            //     y:"240", 
            //     width:"150", 
            //     height:"40"
            // }).style("fill", "blue");


            // var workstation4 = svg.append('g').classed('workstation', true).append('rect').attr({
            //     x: "100", 
            //     y:"160", 
            //     width:"150", 
            //     height:"40"
            // }).style("fill", "blue");


// <rect x="50" y="20" width="150" height="150"
  // style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />

            var point;

            var points = svg.append('g').attr('class', 'points').selectAll('g.point');
            // var point = points.select('rect');
            var office = svg.append('g').attr('class', 'office').append('rect');
            var workbench = svg.append('g').attr('class', 'workbench').append('rect');
            
            var workbench1 = svg.append('g').attr('class', 'workbench1').append('rect');
            var workbench2 = svg.append('g').attr('class', 'workbench2').append('rect');
            var workbench3 = svg.append('g').attr('class', 'workbench3').append('rect');
            var workbench4 = svg.append('g').attr('class', 'workbench4').append('rect');
            
            var cnc = svg.append('g').attr('class', 'cnc').append('rect');

            var x = d3.scale.linear();
            var y = d3.scale.linear();

            if (!!scope.data) {
                // var x_extent = d3.extent(scope.data, function(d, i) {
                //     return d.x_pos;
                // });
                    var x_max = d3.max(scope.data, function(d){
                        return d.x_pos
                    })
                // x.domain([0, x_max]);
                x.domain([0, 1500]);

                // x.domain(x_extent);
                var y_max = d3.max(scope.data, function(d) {
                    return d.y_pos
                });
                // y.domain([0, y_max]);
                y.domain([0, 2094]);
            }


            scope.$watch(function() {
                // console.log("watch called");
                w = el.clientWidth;
                h = el.clientHeight;
                // console.log("width", w);
                // console.log("height", h);
                return w + h;


            }, resize);

            function resize() {
                svg.attr({
                    width: w,
                    height: h
                });
                x.range([0, w]);
                y.range([0, h]);

            office.attr({
                x: x(587), 
                y: y(60),
                width: x(357),
                height: y(259),
                fill: '#D9F0FF',
                'stroke-width':3
            })


            workbench.attr({
                x: x(40), 
                y: y(447),
                width: x(322),
                height: y(72),
                fill: '#D9F0FF'
            })

            cnc.attr({
                x: x(429), 
                y: y(844),
                width: x(230),
                height: y(230),
                fill: '#D9F0FF'
            })

            workbench1.attr({
                x: x(594), 
                y: y(1654),
                width: x(382),
                height: y(64),
                fill: '#EEF8FD'
            })

            workbench2.attr({
                x: x(594), 
                y: y(1469),
                width: x(382),
                height: y(64),
                fill: '#D9F0FF'
            })


            workbench3.attr({
                x: x(594), 
                y: y(1284),
                width: x(382),
                height: y(64),
                fill: '#D9F0FF'
            })

            workbench4.attr({
                x: x(594), 
                y: y(1099),
                width: x(382),
                height: y(64),
                fill: '#D9F0FF'
            })

            points.select('rect').attr({
                width: x(74), 
                height: y(74)
            })

                svg.on('mousemove', function(){
                    var pos = d3.mouse(this);
                    svg.append('circle').attr("cx", pos[0]).attr("cy", pos[1]).attr('r', 3);

                })

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
                    // var x_max = d3.max(scope.data, function(d){
                    //     return d.x_pos
                    // })
                    // var x_extent = d3.extent(scope.data, function(d, i) {
                    //     return d.x_pos;
                    // });
                    // x.domain(x_extent);
                    // x.domain([0, 750]);
                    // var y_max = d3.max(scope.data, function(d) {
                    //     return d.y_pos
                    // });
                    // y.domain([0, 1047]);

                var circle = points.enter()
                    .append('g')
                    .attr('class', 'point');

                // circle.append('circle').attr('r', 10);
                // console.log()
                point = circle.append('rect').attr({width: x(74), height: y(74)});
                points.attr('transform', function(d, i) {
                    return 'translate(' + [x(d.x_pos), y(d.y_pos)] + ')';
                })

                points.attr('fill', function(d) {
                    return d.status === true ? "red" : "#2ecc71"
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