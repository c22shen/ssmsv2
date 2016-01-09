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


var defs = svg.append('svg:defs');

var picture_size = 74;




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
            var msgPopover = svg.append('g').attr('class', 'pop').append('div').style({
                width: 100,
                height: 50
            }).style({'fill': 'white', 'fill-opacity': 0});
            var officetext = d3.select('.pop').append('text').classed('popovertext', true).text('OFFICE').attr({'font-size': '30'});

            d3.select('.pop').append('text')
            var x = d3.scale.linear();
            var y = d3.scale.linear();

                x.domain([0, 1500]);
                y.domain([0, 2094]);
var millingfreepattern = defs.append("svg:pattern")
    .attr("id", "milling_pattern")
    .attr("width", 74)
    .attr("height", 74)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("id", "milling_pattern_image")
    .attr("xlink:href", '/images/millingfree.png')
    .attr("width", 74)
    .attr("height", 74)
    .attr("x", 0)
    .attr("y", 0);


var lathesfreepattern = defs.append("svg:pattern")
    .attr("id", "lathes_pattern")
    .attr("width", 74)
    .attr("height", 74)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("id", "lathes_pattern_image")
    .attr("xlink:href", '/images/lathesfree.png')
    .attr("width", 74)
    .attr("height", 74)
    .attr("x", 0)
    .attr("y", 0);


            scope.$watch(function() {
                // console.log("watch called");
                w = el.clientWidth;
                h = el.clientHeight;
                // console.log("width", w);
                // console.log("height", h);
                return w + h;


            }, resize);

            function resize() {


                // console.log(x(picture_size));
                // console.log(y(picture_size));
                // point.style('fill', "url(#milling_pattern)");
                svg.attr({
                    width: w,
                    height: h
                });
                x.range([0, w]);
                y.range([0, h]);

     msgPopover.attr({
                width: x(100),
                height: y(50)
            })


                svg.select("#lathespattern").attr("width", x(picture_size))
    .attr("height", y(picture_size));

                svg.select('#lathes_pattern_image').attr("width", x(picture_size))
                .attr("height", y(picture_size));



                svg.select("#milling_pattern").attr("width", x(picture_size))
    .attr("height", y(picture_size));

                svg.select('#milling_pattern_image').attr("width", x(picture_size))
                .attr("height", y(picture_size));
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
                    x_pos = pos[0];
                    y_pos = pos[1];

                    if (x_pos>x(587) && x_pos<x(944)){
                        if (y_pos>y(60) && y_pos<y(319)){
                        console.log("within horizontal strip");
msgPopover.attr({
    x: x_pos,
    y: y_pos
}).style('fill-opacity', 1)

officetext.attr({
    x: x_pos,
    y: y_pos+25,
    visibility: 'visible',
    'alignment-baseline': "middle",
    'text-anchor':"middle"
}).style('fill-opacity', 1)
                

                        }
                    } else if (x_pos>x(587) && x_pos<x(944)){


                    }
                    else {
                        msgPopover.style('fill-opacity', 0)
                        officetext.attr('visibility', 'hidden')
                    }

                    // svg.append('circle').attr("cx", pos[0]).attr("cy", pos[1]).attr('r', 3);

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
                point = circle.append('rect').attr({width: x(74), height: y(74)})
                .style('fill', function(d){if (d.machineType==='lathes'){return "url(#lathes_pattern)"} else {return "url(#milling_pattern)"}});
                points.attr('transform', function(d, i) {
                    return 'translate(' + [x(d.x_pos), y(d.y_pos)] + ')';
                }).on('mouseover',function(){
                    console.log("mouseover");
                })

                point.on('mouseover',function(){
                    console.log("mouseover");
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