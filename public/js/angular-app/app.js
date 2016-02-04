'use strict';

angular
	.module('ssms.app', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngCookies', 'ui.bootstrap','duScroll'])
	    .factory('d3', function() {
        return d3;
    })

