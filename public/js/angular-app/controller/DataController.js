angular
	.module('app')
	.controller("DataController", ['$rootScope', '$scope', 'socketio', function($rootScope, $scope, socketio){
	'use strict';

	socketio.on('machine', function(status){
		// $scope.machines
		console.log(status);
		// should update the UI
		// assume data saving taken care of on the server side
	})
}])