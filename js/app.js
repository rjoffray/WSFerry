/**
 * Created by rjoffray on 8/16/15.
 */
    moment.tz.setDefault("America/Los_Angeles");

    var app = angular.module('wsfApplication', ['ngRoute','ngResource','ngAnimate','ngTouch','duScroll','uiGmapgoogle-maps'])
        .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                //key: 'AIzaSyAQvHcK6IuONwOECUFJndMNbOiD-puj7Ds',
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization'
            });
        }).config(['$httpProvider', function ($httpProvider) {

            $httpProvider.defaults.cache = false;
        }]);

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
                    when('/times/:departingId/:arrivingId/:scheduleDate', {
                        templateUrl: 'partials/times.html',
                        controller: 'timesController'
                    }).
                    when('/times/:departingId/:arrivingId', {
                        templateUrl: 'partials/times.html',
                        controller: 'timesController'
                    }).
                    when('/tickets/:ticketId', {
                        templateUrl: 'partials/tickets.html',
                        controller: 'ticketsController'
                    }).
                    when('/tickets', {
                        templateUrl: 'partials/tickets.html',
                        controller: 'ticketsController'
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
    app.animation('.slide', ['$animateCss', function($animateCss) {
        return {
            enter: function(element, doneFn) {
                var offset=0;
                if(element.hasClass('with-list-head')){
                    offset=30;
                }
                if(element.hasClass('with-list-head') && element.hasClass('with-button-nav')){
                    offset=87
                }
                element.height($(window).height()-(44+offset));
                $("[role='right-nav']").height($(window).height())

                //window.addEventListener("orientationchange", function() {
                //    element.height($(window).height()-(44+offset));
                //    $("[role='right-nav']").height($(window).height())
                //}, false);

                //setup animation
                var animation = $animateCss(element, {
                    event: 'enter'
                });
                //trigger animation
                animation.start();
                //alert($(window).height())
               //element.height($(window).height())
                //setup done callback
                //animation.done(doneFn);
            }
        }
    }])

_.mixin({
    'findByValues': function(collection, property, values) {
        return _.filter(collection, function(item) {
            return _.contains(values, item[property]);
        });
    },
    'findByString': function(collection, property, val) {
        return _.filter(collection, function(item) {
            //console.log("****isEqual****",item[property],val)
            return _.isEqual(item[property],val);
        });
    },
    'findByPartialValue': function(collection, property, val) {
        return _.filter(collection, function(item) {
            return item[property].toString().toLowerCase().search(val.toString().toLowerCase()) >= 0;
        });
    },
    'findBetweenValue': function(collection, property, min, max) {
        return _.filter(collection, function(item) {
            return parseInt(item[property].replace(",","")).between(min,max,true);
        });
    }
});

//$(document).ready(function () {
//    function reorient(e) {
//        var portrait = (window.orientation % 180 == 0);
//        $("body > div").css("-webkit-transform-origin", "0 0");
//        $("body > div").css("-webkit-transform", !portrait ? "rotate(0deg)" : "");
//    }
//    window.onorientationchange = reorient;
//    window.setTimeout(reorient, 0);
//});

