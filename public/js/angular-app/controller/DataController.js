angular
    .module('app')
    .controller("DataController", ['$rootScope', '$scope', 'socketio', function($rootScope, $scope, socketio) {
        'use strict';

        $rootScope.statusArray = [];

        $scope.labels1 = ["", "", "", "", ""];
        $scope.series1 = ['Lathes'];
        $scope.data1 = [
            [10,10,10,10,10]
        ];

        $scope.labels2 = ["", "", "", "", ""];
        $scope.series2 = ['Mill'];
        $scope.data2 = [
            [10,10,10,10,10]
        ];
        socketio.on('updateMachineStatus', function(status) {
            console.log(status);
            if (status.machine_id === "40b09a44") {

                if ($scope.data1[0].length < 10) {
                    $scope.labels1.push(new Date().toLocaleString().substr(new Date().toLocaleString().indexOf(",") + 1));
                    $scope.data1[0].push(status.current_value);
                } else {
                    $scope.labels1.shift();
                    $scope.labels1.push(new Date().toLocaleString().substr(new Date().toLocaleString().indexOf(",") + 1));
                    $scope.data1[0].shift();
                    $scope.data1[0].push(status.current_value);
                }
            } else if (status.machine_id === "40ad72ce") {
                if ($scope.data2[0].length < 10) {
                    $scope.labels2.push(new Date().toLocaleString().substr(new Date().toLocaleString().indexOf(",") + 1));
                    $scope.data2[0].push(status.current_value);
                } else {
                    $scope.labels2.shift();
                    $scope.labels2.push(new Date().toLocaleString().substr(new Date().toLocaleString().indexOf(",") + 1));
                    $scope.data2[0].shift();
                    $scope.data2[0].push(status.current_value);
                }
            }
        })
    }])
