angular
    .module('app')
    .controller("DataController", ['$rootScope', '$scope', 'socketio', '$interval', '$http', '$window', function($rootScope, $scope, socketio, $interval, $http, $window) {
        'use strict';
        $rootScope.statusArray = [];
        angular.element($window).on('resize', function() {
            $scope.$apply();
        })

        var initializeStatusData = function() {
            $http.get('/machines/positions', {
            }).
            then(function(res) {
                $rootScope.statusArray = res.data;
                $rootScope.statusArray.forEach(function(d){d.status? null: d.status=false});
            }, function(res) {})
        }
        initializeStatusData();


        var processData = function(machineId, currentValue, currentThreshold) {
            var currentMachineStatus;
            var isMachineOn = function(current_reading, threshold) {
                console.log(""+current_reading);
                if (typeof current_reading !== 'number' || typeof threshold !== 'number') {
                    console.log("false");
                    return false;
                }
                                    console.log("true");
                return current_reading > threshold ? true : false;
            }
            var machineDataArray = $rootScope.statusArray.filter(function(d) {
                return d.machineId === machineId
            });
            if (machineDataArray.length != 0) {
                currentMachineStatus = machineDataArray[0].status;
            }
            if (currentMachineStatus !== isMachineOn(currentValue, currentThreshold)) {
                $http.post('/machines/create', {
                    machineId: machineId,
                    status: !currentMachineStatus
                }).
                then(function(res) {}, function(res) {})

                $rootScope.statusArray.forEach(function(data) {
                    if (data.machineId === machineId) {
                        data.status = !currentMachineStatus
                    }
                })
            };

        }


        var createDataTest = function(numberOfTestData, updateIntervalMsec, currentThreshold) {
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            var i;
            for (i = 0; i < numberOfTestData; i++) {
                var genMachineId = Math.random().toString(36).substring(7);
                var genStatus = Math.random() >= 0.5;
                var gen_x_pos = randomIntFromInterval(0, 200);
                var gen_y_pos = randomIntFromInterval(0, 200);
                var gen_status = {
                    machineId: genMachineId,
                    status: genStatus,
                    x_pos: gen_x_pos,
                    y_pos: gen_y_pos
                };
                $rootScope.statusArray.push(gen_status);
            }
            // Testing 
            $interval(function() {
                    var machineIdList = $rootScope.statusArray.map(function(d) {
                        return d.machineId;
                    })

                    var machineId = machineIdList[Math.floor(Math.random() * machineIdList.length)];
                    var maximum_current_reading = 200,
                        minimum_current_reading = 5;
                    var currentValue = Math.floor(Math.random() * (maximum_current_reading - minimum_current_reading + 1)) + minimum_current_reading;
                    $rootScope.newestData = {
                        machineId: machineId,
                        currentValue: currentValue
                    };
                    processData(machineId, currentValue, currentThreshold);
                },
                updateIntervalMsec);
        }
        // createDataTest(2, 2000, 100);
        socketio.on('updateMachineStatus', function(status) {
            processData(status.machine_id, status.current_value, 10);
        })
    }])
