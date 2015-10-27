angular
    .module('app')
    .controller("DataController", ['$rootScope', '$scope', 'socketio', '$interval', '$http', '$window', function($rootScope, $scope, socketio, $interval, $http, $window) {
        'use strict';

        angular.element($window).on('resize', function() {
            $scope.$apply()
        })

        var initializeChartData = function() {
            // should be retrieved from database
            $rootScope.machineInfo = {
                "id40b09a44": {
                    x_pos: 5,
                    y_pos: 5
                },
                "id40ad72ce": {
                    x_pos: 100,
                    y_pos: 100
                },
                "id40ad82ce": {
                    x_pos: 200,
                    y_pos: 200
                }
            };
            $rootScope.statusArray = [{
                machineId: "id40b09a44",
                x_pos: 5,
                y_pos: 5,
                status: false
            }, {
                machineId: "id40ad72ce",
                status: false,
                x_pos: 100,
                y_pos: 100
            }, {
                machineId: "id40ad82ce",
                status: false,
                x_pos: 200,
                y_pos: 200
            }];

        }

        //Testing
        var initializeCurrentChart = function() {
            $scope.chartops1 = {
                scaleBeginAtZero: true
            }
            $scope.chartops2 = {
                scaleBeginAtZero: true
            }
            $scope.labels1 = [];
            $scope.series1 = ['Lathes'];
            $scope.data1 = [
                []
            ];
            $scope.labels2 = [];
            $scope.series2 = ['Mill'];
            $scope.data2 = [
                []
            ];
        }

        //Testing
        var showAllIncomingMsgs = function() {
            $rootScope.statusArray.push(status);
        }

        var createDataTest = function() {

            var isMachineOn = function(current_reading, threshold) {
                    if (typeof current_reading !== 'number' || typeof threshold !== 'number') {
                        return false;
                    }
                    return current_reading > threshold ? true : false;
                }
                // Testing 
            $interval(function() {
                var machineIdList = Object.keys($rootScope.machineInfo);
                var machineId = machineIdList[Math.floor(Math.random() * machineIdList.length)];
                var maximum_current_reading = 200,
                    minimum_current_reading = 5;
                var currentValue = Math.floor(Math.random() * (maximum_current_reading - minimum_current_reading + 1)) + minimum_current_reading;
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

        initializeChartData();
        initializeCurrentChart();
        createDataTest();


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
            // Test charts

            if (status.machine_id === "40b09a44") {

                if (status.current_value <= 18.5) {
                    $rootScope.machine1Status = false;
                } else {
                    $rootScope.machine1Status = true;
                }

                if ($scope.data1[0].length < 25) {
                    $scope.labels1.push("");
                    $scope.data1[0].push(status.current_value);
                } else {
                    $scope.labels1.shift();
                    $scope.labels1.push("");
                    $scope.data1[0].shift();
                    $scope.data1[0].push(status.current_value);
                }
            } else if (status.machine_id === "40ad72ce") {
                if (status.current_value <= 11.5) {
                    $rootScope.machine2Status = false;
                } else {
                    $rootScope.machine2Status = true;
                }
                if ($scope.data2[0].length < 25) {
                    $scope.labels2.push("");
                    $scope.data2[0].push(status.current_value);
                } else {
                    $scope.labels2.shift();
                    $scope.labels2.push("");
                    $scope.data2[0].shift();
                    $scope.data2[0].push(status.current_value);
                }
            }
        })
    }])
