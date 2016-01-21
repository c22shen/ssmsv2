angular
    .module('ssms.app')
    .directive('linechart', ["d3", "$rootScope", "$interval",
        function(d3, $rootScope, $interval) {
            function link(scope, el, attr) {
                el = el[0];
                $rootScope.dataArray = [{
                        "count": 150,
                        "time": new Date("2015-03-25T08:00:00")
                    }, {
                        "count": 200,
                        "time": new Date("2015-03-25T09:00:00")
                    }, {
                        "count": 180,
                        "time": new Date("2015-03-25T10:00:00")
                    }

                ];
                // dataArray = [{
                //         "count": 150,
                //         "time": new Date("2015-03-25T08:00:00")
                //     }, {
                //         "count": 200,
                //         "time": new Date("2015-03-25T09:00:00")
                //     }, {
                //         "count": 180,
                //         "time": new Date("2015-03-25T10:00:00")
                //     }

                // ];


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

                var start = new Date("2015-03-25T08:00:00");
                var end = new Date("2015-03-25T23:00:00");

                var xScale = d3.time.scale.utc().range([margins.left, width - margins.right]).domain([start, end]);
                var yScale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([134, 215]);

                xScale.tickFormat("%I:%M");
                // d3.time.scale().range([0, width]);

                // xScale.ticks(d3.time.hours, 1);
                xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(d3.time.hour, 1)


                yAxis = d3.svg.axis()
                    .scale(yScale);

                var svg = svg_container
                    .attr('width', width)
                    .attr('height', height)
                    .append("g");

                svg.append("svg:g")
                    .attr("class", "axis xaxis")
                    .attr("transform", "translate(0," + (height - margins.bottom) + ")")
                    .call(xAxis);


                yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

                svg.append("svg:g")
                    .attr("class", "axis yaxis")
                    .attr("transform", "translate(" + (margins.left) + ",0)")
                    .call(yAxis);


                var lineGen = d3.svg.line()
                    .x(function(d) {
                        return xScale(d.time);
                    })
                    .y(function(d) {
                        return yScale(d.count);
                    }).interpolate('basis');

                svg.append('svg:path')
                    .classed('line1', true)
                    .attr('d', lineGen($rootScope.dataArray))
                    .attr('stroke', 'green')
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');



                // svg.append('svg:path')
                //     .classed('line2', true)
                //     .attr('d', lineGen(data2))
                //     .attr('stroke', 'blue')
                //     .attr('stroke-width', 2)
                //     .attr('fill', 'none');

                var yMin = start;
                var yMax = new Date("2015-03-25T24:00:00");

                var newtime = new Date("2015-03-25T10:00:00");

                $interval(function() {
                    newtime.setUTCHours(newtime.getUTCHours()+1);
                    // newtime = new Date(newtime.getUTCFullYear(), newtime.getUTCMonth(), newtime.getUTCDate(), newtime.getUTCHours()+1, newtime.getUTCMinutes(), newtime.getUTCSeconds(), newtime.getUTCMilliseconds());
                    // this.setTime(this.getTime() + (h*60*60*1000)); 

                    // yMin = yMin + 2;
                    newData = Math.floor((Math.random() * 100) + 140);

                    // y.domain([0, d3.max(data, function(d) { return d.close; })]);
                    // xScale.domain([yMin, yMax]);
                    // data.shift();
                    var newSet = {
                        "count": newData,
                        "time": new Date(Date.UTC(newtime.getUTCFullYear(), newtime.getUTCMonth(), newtime.getUTCDate(), newtime.getUTCHours(), newtime.getUTCMinutes(), newtime.getUTCSeconds(), newtime.getUTCMilliseconds())),
                        
                    }
                    // console.log(da)

                    $rootScope.dataArray.push(newSet);

                    console.log("newDAta", newData);
                     var svg = d3.select("body").transition();

                    // Make the changes
                    svg.select(".line1") // change the line
                        .duration(750)
                        .attr("d", lineGen($rootScope.dataArray));
                    // svg.select(".xaxis") // change the x axis
                    //     .duration(750)
                    //     .call(xAxis);
                    // svg.select(".y.axis") // change the y axis
                    //     .duration(750)
                    //     .call(yAxis);


                }, 5000)




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
