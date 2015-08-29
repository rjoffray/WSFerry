app.controller('applicationController',['$rootScope','$http','$scope','$timeout','$window','terminalService','scheduleService','$location','$routeParams','$anchorScroll', function($rootScope,$http,$scope,$timeout,$window,terminalService,scheduleService,$location,$routeParams,$anchorScroll) {

    $rootScope.$on("$locationChangeStart",function(event,current,previous){
        //alert("change start")
    });

    $scope.menuOpen = false;
    $scope.menuTitle = "";
    $scope.setTitle= function(title){
        $scope.menuTitle = title;
    }
    angular.element(".offcanvas").on("click",function(event){
        var _self=this;
        console.log(event,event.offsetX,$("[role=right-nav]")[0].offsetWidth);
        console.log("clicked to left:",event.target.className)
        if ((event.offsetX < $("[role=right-nav]")[0].offsetWidth) && event.target.className == "offcanvas") {

            $scope.closeNav();
        }
    });
    $scope.openNav = function(){
        $anchorScroll("scrolltop")
        $timeout(function(){
            $scope.menuOpen = true
            $('body').addClass("nav-open");
        },0);

    }
    $scope.closeNav = function(){
        $anchorScroll("scrollto")
        $timeout(function(){
            $scope.menuOpen = false;
            $('body').removeClass("nav-open");
        },0);

    }
    $scope.goBack = function(){
        $timeout(function(){
            $window.history.back();
            console.log("back")
        },0);
    }
    $scope.goForward = function(){
        $timeout(function(){
            $window.history.forward();
            console.log("forward")
        },0);
    }
    $scope.goToUrl = function(url){
        $location.path(url);
        $scope.menuOpen = false;
    }
    $scope.viewClass = "home";
    $scope.terminalApi = {};
    $scope.scheduleApi = {};
    $scope.FauntleroyVashon = {};

    $scope.departingId = $routeParams.departingId;

    terminalService.getTerminalServices().then(function(response){
        $scope.terminalApi =  response;
        //console.log("terminalApi promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    scheduleService.getScheduleServices().then(function(response){
        $scope.scheduleApi =  response;
        //console.log("Schedule service promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    scheduleService.getSchedule("9","22").then(function(response){
        $scope.FauntleroyVashon =  response.data;
        //console.log("Fauntleroy - Vashon Schedule service promise returned: ",$scope.FauntleroyVashon);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

    $scope.$watch("terminalApi",function(newData,oldData){
        if(newData != oldData){
            $scope.terminalApi = newData;
            console.log("Terminal service watched data! ",newData)
        }

    });
    $scope.$watch("scheduleApi",function(newData,oldData){
        if(newData != oldData){
            $scope.scheduleApi = newData;
            console.log("Schedule service watched data! ",newData)
        }

    });

    $scope.goArriving = function ( id ) {
        $location.path( "arriving/"+id );
    };

    $scope.goTimes = function ( departing, arriving ) {
        $location.path( "times/"+departing+"/"+arriving );
    };



    $scope.fixMsDate = function(msDate){
        return moment(msDate).format("h:mm a")
    };
    $scope.getTerminalNameFromId = function(id){
        var name = ""
        _.forEach($scope.terminalApi.Basics,function(value,key){
            if(value.TerminalID == parseInt(id)){
                name = value.TerminalName;
                return false;
            }
        });
        return name;
    }
    $scope.$watch("terminalApi",function(newData,oldData){
        if(newData != oldData){
            $scope.Terminals = newData.Basics;
            $scope.terminalApi = newData;
            //console.log("Terminal service watched data! ",newData)
        }

    });

}]);
