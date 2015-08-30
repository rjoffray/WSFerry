/**
 * Created by rjoffray on 8/16/15.
 */
    moment.tz.setDefault("America/Los_Angeles");

    var app = angular.module('wsfApplication', ['ngRoute','ngResource','ngAnimate','ngTouch','duScroll']);

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
    app.animation('.slide', ['$animateCss', function($animateCss) {
        return {
            enter: function(element, doneFn) {
                element.height($(window).height()-120);
                $(window).on("orientationchange",function(){
                    element.height($(window).height()-120);
                    alert($(window).orientation)
                })

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
$(window).on("orientationchange",function(){
    alert("The orientation has changed!");
});
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



