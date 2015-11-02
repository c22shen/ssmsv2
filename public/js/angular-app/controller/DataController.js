angular
    .module('app')
    .controller("DataController", ['$rootScope', '$scope', 'socketio', '$interval', '$http', '$window', function($rootScope, $scope, socketio, $interval, $http, $window) {
        'use strict';

        angular.element($window).on('resize', function() {
            $scope.$apply()
        })

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var initializeChartData = function() {
            // think about how to initialize
        }

        var createDataTest = function(numberOfTestData) {
            $rootScope.statusArray = [];
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

            var isMachineOn = function(current_reading, threshold) {
                    if (typeof current_reading !== 'number' || typeof threshold !== 'number') {
                        return false;
                    }
                    return current_reading > threshold ? true : false;
                }
                // Testing 
            $interval(function() {
                var machineIdList = [];
                $rootScope.statusArray.forEach(function(d) {
                    machineIdList.push(d.machineId);
                })


                var machineId = machineIdList[Math.floor(Math.random() * machineIdList.length)];
                var maximum_current_reading = 200,
                    minimum_current_reading = 5;
                var currentValue = Math.floor(Math.random() * (maximum_current_reading - minimum_current_reading + 1)) + minimum_current_reading;

                // socketio.emit('updateMachineStatus', {
                //     machine_id: machineId,
                //     current_value: currentValue
                // });

                var currentMachineStatus = $rootScope.statusArray.filter(function(d) {
                    return d.machineId === machineId
                })[0].status;

                if (currentMachineStatus !== isMachineOn(currentValue, 100)) {
                    // store data in dataBase
                    // issues

                    $rootScope.statusArray.forEach(function(data) {
                        if (data.machineId === machineId) {
                            data.status = !currentMachineStatus
                        }
                    })
                };
            }, 1000);
        }

        // initializeChartData();
        createDataTest(20);


        socketio.on('updateMachineStatus', function(status) {

            var currentMachineStatus = $rootScope.statusArray.filter(function(d) {
                return d.machineId === status.machine_id
            })[0].status;

            if (currentMachineStatus !== isMachineOn(status.current_value, 100)) {
                // store data in dataBase
                // req.body is currently empty -> investigate

                $rootScope.statusArray.forEach(function(data) {
                    if (data.machineId === machineId) {
                        data.status = !currentMachineStatus
                    }
                })
            }
        })
    }])
