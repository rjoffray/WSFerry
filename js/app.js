/**
 * Created by rjoffray on 8/16/15.
 */

    var app = angular.module('wsfApplication', ['ngRoute','ngResource','ngAnimate']);

    app.config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/departing', {
                        templateUrl: 'partials/departing.html',
                        controller: 'departingController'
                    }).
                    when('/arriving/:departingId', {
                        templateUrl: 'partials/arriving.html',
                        controller: 'arrivingController'
                    }).
                    when('/times/:departingId/:arrivingId', {
                        templateUrl: 'partials/times.html',
                        controller: 'timesController'
                    }).
                    otherwise({
                        redirectTo: 'departing'
                    });

            }]);

    app.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });

