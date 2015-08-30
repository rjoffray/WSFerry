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
                var offset=0;
                if(element.hasClass('with-list-head')){
                    offset=30;
                }
                if(element.hasClass('with-list-head') && element.hasClass('with-button-nav')){
                    offset=77
                }
                element.height($(window).height()-(44+offset));
                $("[role='right-nav']").height($(window).height())

                window.addEventListener("orientationchange", function() {
                    element.height($(window).height()-(44+offset));
                    $("[role='right-nav']").height($(window).height())
                }, false);

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

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.*/(function(m){if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1)){return}var l=m.document;if(!l.querySelector){return}var n=l.querySelector("meta[name=viewport]"),a=n&&n.getAttribute("content"),k=a+",maximum-scale=1",d=a+",maximum-scale=10",g=true,j,i,h,c;if(!n){return}function f(){n.setAttribute("content",d);g=true}function b(){n.setAttribute("content",k);g=false}function e(o){c=o.accelerationIncludingGravity;j=Math.abs(c.x);i=Math.abs(c.y);h=Math.abs(c.z);if(!m.orientation&&(j>7||((h>6&&i<8||h<8&&i>6)&&j>5))){if(g){b()}}else{if(!g){f()}}}m.addEventListener("orientationchange",f,false);m.addEventListener("devicemotion",e,false)})(this);



