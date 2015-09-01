app.controller('applicationController', ['$rootScope',
    '$http',
    '$log',
    '$scope',
    '$timeout',
    '$window',
    'terminalService',
    'scheduleService',
    'vesselService',
    '$location',
    '$routeParams',
    '$anchorScroll','uiGmapGoogleMapApi','$compile', function ($rootScope, $http,$log, $scope, $timeout, $window, terminalService, scheduleService, vesselService, $location, $routeParams, $anchorScroll,uiGmapGoogleMapApi,$compile) {

        $rootScope.$on("$locationChangeEnd", function (event, current, previous) {
            //alert("change start")

        });
        //$(window).$on.('resize',function(){
        //    var windowHeight
        //})
        $timeout(function () {
            $("[role=right-nav]").hide();
        }, 500);
        $scope.menuOpen = false;
        $scope.menuTitle = "";
        $scope.showListHeader = false;
        $scope.listHeaderMessage = "";
        $scope.showSubNav = false;
        $scope.validScheduleStartDate = new Date();
        $scope.validScheduletEndDate = new Date();
        $scope.showModalMap = false;

        $scope.setTitle = function (title) {
            $scope.menuTitle = title;

        }
        $scope.setViewClass = function (viewClass) {
            $scope.viewClass = viewClass;
        }
        $scope.setListHeader = function (show, title) {
            $scope.showListHeader = show;
            $scope.listHeaderMessage = title;
            if (show) {
                $(".view").addClass("with-list-head");
            } else {
                $(".view").removeClass("with-list-head");
            }
        }
        $scope.setDatePicker = function () {
            $timeout(function () {
                $('.datepicker').datepicker({
                    format: 'DD, M dd, yyyy',
                    autoclose: true,
                    orientation: 'auto',
                    startDate: $scope.validScheduleStartDate,
                    endDate: $scope.validScheduleEndDate
                })
                $('.datepicker.input').on('changeDate', function (e) {
                    var url = "/times/" + $routeParams.departingId + "/" + $routeParams.arrivingId + "/" + moment(e.date).format("YYYY-MM-DD")
                    //console.log("url: ", url)
                    $scope.goToUrl(url);
                    $scope.$apply();


                });
            }, 500)

        }

        $scope.setSubNav = function (show) {
            $scope.showSubNav = show;
            if (show) {
                $(".view").addClass("with-button-nav");
            } else {
                $(".view").removeClass("with-button-nav");
            }

        }
        $scope.getMapBounds = function () {
            var boundsArray = {}
            _.forEach($scope.terminalApi.Locations, function (v,k) {
                if (v.TerminalID == $routeParams.departingId || v.TerminalID == $routeParams.arrivingId) {
                    boundsArray[v.TerminalID] = {lat: v.Latitude, lon: v.Longitude, id: v.TerminalID}
                }
            });
            return boundsArray;

        }
        $scope.initMap = function(){
            $scope.bounds = $scope.getMapBounds();
            console.log("bounds: ",bounds)

        }
        uiGmapGoogleMapApi.then(function(maps) {

        });
        $scope.markers=[];
        $scope.createTerminalMarker = function(){
            $timeout(function(){
                _.forEach($scope.terminalApi.Locations, function (v,k) {
                    if (v.TerminalID == $routeParams.departingId || v.TerminalID == $routeParams.arrivingId) {
                        var myLatLng = {lat: v.Latitude, lng: v.Longitude};
                        var marker = new google.maps.Marker({
                            position: myLatLng,
                            map: $scope.mapInstance,
                            title: v.TerminalName
                        });
                        $scope.markers.push(marker);
                    }
                });
            },0)
        }
        $scope.createVesselMarkers = function(){
            $timeout(function(){
                _.forEach($scope.vesselsApi, function (v,k) {

                       if(v.InService == true) {

                           var myLatLng = {lat: v.Latitude, lng: v.Longitude};
                           var marker = new google.maps.Marker({
                               position: myLatLng,
                               map: $scope.mapInstance,
                               title: v.VesselName,
                               icon: {
                                   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                   scale: 4,
                                   fillColor: "#017359",
                                   fillOpacity: 0.8,
                                   strokeWeight: 0,
                                   strokeColor: "blue",
                                   rotation: v.Heading //this is how to rotate the pointer
                               }
                           });
                           var eta = v.Eta != null ? 'Eta: ' + moment(v.Eta).format("h:mm a") : '';
                           var infowindow = new google.maps.InfoWindow({
                               content: '<div>Vessel: ' + v.VesselName + '</div> \n\
                                  <div>Departing: ' + v.DepartingTerminalName + '</div>\n\
                                  <div>Arriving: ' + v.ArrivingTerminalName + '</div>\n\
                                  <span>' + eta + '</span>'
                           });

                           google.maps.event.addListener(marker, 'click', function () {
                               if ($scope.infowindow) $scope.infowindow.close();
                               $scope.infowindow = infowindow;
                               infowindow.open($scope.mapInstance, marker);
                           });
                           $scope.markers.push(marker);
                       }
                });
            },0)
        }
        $('#mapModal').on('shown.bs.modal', function () {
            $scope.markers=[];
            $timeout(function(){
                $scope.bounds = $scope.getMapBounds()
                $scope.map = {
                    center: { latitude: $scope.bounds[$routeParams.departingId].lat, longitude: $scope.bounds[$routeParams.departingId].lon },
                    zoom: 11,
                    events: {
                        tilesloaded: function (map) {
                            $scope.mapInstance = map;
                            //$scope.createTerminalMarker();
                            $scope.createVesselMarkers();
                            $scope.$apply(function () {
                                google.maps.event.trigger(map, "resize");
                            });
                        }
                    }
                };

                $scope.showModalMap = true;
            },0)


        });
        $scope.reverseSchedule = function () {
            //console.log();
            var pathArray = $location.path().split("/");
            console.log(pathArray)
            if (pathArray[4]) {
                $location.path(pathArray[1] + "/" + pathArray[3] + "/" + pathArray[2] + "/" + pathArray[4])
            } else {
                $location.path(pathArray[1] + "/" + pathArray[3] + "/" + pathArray[2])
            }
            //$location.path(pathArray[1]+"/"+pathArray[3]+"/"+pathArray[2])
        }
        angular.element(".offcanvas").on("click", function (event) {
            var _self = this;
            console.log(event, event.offsetX, $("[role=right-nav]")[0].offsetWidth);
            console.log("clicked to left:", event.target.className)
            if ((event.offsetX < $("[role=right-nav]")[0].offsetWidth) && event.target.className == "offcanvas") {

                $scope.closeNav();
            }
        });
        $scope.openNav = function () {
            $anchorScroll("scrolltop")
            $timeout(function () {
                $scope.menuOpen = true;
                $("[role=right-nav]").show();
                $('body').addClass("nav-open");
            }, 0);

        }
        $scope.closeNav = function () {
            $anchorScroll("scrollto")
            $timeout(function () {
                $scope.menuOpen = false;

                $('body').removeClass("nav-open");
                $('body').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                    function (event) {
                        // Do something when the transition ends
                        $("[role=right-nav]").hide();

                    });
            }, 0);

        }
        $scope.goBack = function () {
            $timeout(function () {
                $window.history.back();
                console.log("back")
            }, 0);
        }
        $scope.goForward = function () {
            $timeout(function () {
                $window.history.forward();
                console.log("forward")
            }, 0);
        }
        $scope.goToUrl = function (url) {
            $location.path(url);
            $scope.menuOpen = false;
        }
        //$scope.viewClass = "home";
        $scope.terminalApi = {};
        $scope.scheduleApi = {};
        $scope.FauntleroyVashon = {};

        $scope.departingId = $routeParams.departingId;

        terminalService.getTerminalServices().then(function (response) {
            $scope.terminalApi = response;
            //console.log("terminalApi promise returned: ",response);
        }, function (error) {
            //$scope.terminalApi =  error;
            console.log("Error: ", error);
        });
        scheduleService.getScheduleServices().then(function (response) {
            $scope.scheduleApi = response;
            //console.log("Schedule service promise returned: ",response);
        }, function (error) {
            //$scope.terminalApi =  error;
            console.log("Error: ", error);
        });
        scheduleService.getSchedule("9", "22").then(function (response) {
            $scope.FauntleroyVashon = response.data;
            //console.log("Fauntleroy - Vashon Schedule service promise returned: ",$scope.FauntleroyVashon);
        }, function (error) {
            //$scope.terminalApi =  error;
            console.log("Error: ", error);
        });
        vesselService.getVesselLocations().then(function(response){
            $scope.vesselsApi =  response.data;
            //console.log("$$$$$$$$$$$$$$$$$$ Vessel Response $$$$$$$$$$$$$$",response.data)
        },function(error){
            //$scope.terminalApi =  error;
            console.log("Error: ",error);
        });
        $scope.$watch("terminalApi", function (newData, oldData) {
            if (newData != oldData) {
                $scope.Terminals = newData.Basics;
                $scope.terminalApi = newData;
                console.log("Terminal service watched data! ", newData)
            }

        });
        $scope.$watch("vesselsApi", function (newData, oldData) {
            if (newData != oldData) {
                $scope.vesselsApi = newData;
                console.log("Vessels service watched data! ", newData)
            }

        });
        $scope.$watch("scheduleApi", function (newData, oldData) {
            if (newData != oldData) {
                $scope.scheduleApi = newData;
                var a = moment($scope.scheduleApi.ValidDateRange.DateFrom);
                var b = moment($scope.scheduleApi.ValidDateRange.DateThru);
                var days = b.diff(a, 'days');
                $scope.validScheduleStartDate = "0d";
                $scope.validScheduleEndDate = "+" + (days) + "d";
                console.log("Schedule service watched data! ", newData)
            }

        });

        $scope.goArriving = function (id) {
            $location.path("arriving/" + id);
        };

        $scope.goTimes = function (departing, arriving) {
            $location.path("times/" + departing + "/" + arriving);
        };


        $scope.fixMsDate = function (msDate) {
            return moment(msDate).format("h:mm a")
        };
        $scope.getTerminalNameFromId = function (id) {
            var name = ""
            _.forEach($scope.terminalApi.Basics, function (value, key) {
                if (value.TerminalID == parseInt(id)) {
                    name = value.TerminalName;
                    return false;
                }
            });
            return name;
        }
        //$scope.$watch("terminalApi", function (newData, oldData) {
        //    if (newData != oldData) {
        //        $scope.Terminals = newData.Basics;
        //        $scope.terminalApi = newData;
        //        //console.log("Terminal service watched data! ",newData)
        //    }
        //
        //});

    }]);
