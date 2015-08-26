

app.controller('applicationController',['$rootScope','$http','$scope','$timeout','$window','wsfTerminalService','wsfScheduleService','$location','$routeParams','$anchorScroll', function($rootScope,$http,$scope,$timeout,$window,wsfTerminalService,wsfScheduleService,$location,$routeParams,$anchorScroll) {

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

    wsfTerminalService.getTerminalServices().then(function(response){
        $scope.terminalApi =  response;
        //console.log("terminalApi promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    wsfScheduleService.getScheduleServices().then(function(response){
        $scope.scheduleApi =  response;
        //console.log("Schedule service promise returned: ",response);
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    wsfScheduleService.getSchedule("9","22").then(function(response){
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

app.controller('departingController',['$http','$scope','$timeout','$window','$routeParams', function($http,$scope,$timeout,$window,wsfTerminalService,wsfScheduleService,$routeParams) {
    $scope.viewClass = 'departing';
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle("WSF Schedule");
    });


    $timeout(function(){
        $window.scrollTo(0,0)
    },100);
}]);
app.controller('arrivingController',['$scope', '$routeParams', '$location', '$resource','wsfScheduleService','$window','$timeout', function($scope, $routeParams, $location, $resource,wsfScheduleService,$window,$timeout) {
    //console.log("routeParams: ",$routeParams)
    $scope.viewClass = 'arriving';
    $scope.departingId = $routeParams.departingId;
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle($scope.getTerminalNameFromId($scope.departingId))
    });

    wsfScheduleService.getTerminalsMates($scope.departingId).then(function(response){
        $scope.Mates =  response.data;
        //console.log("terminal mates for: ",$scope.departingId," :",$scope.Mates );
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });

    $timeout(function(){
        $window.scrollTo(0,0)
    },100);

}]);
app.controller('timesController',['$scope', '$routeParams', '$location', '$resource','wsfScheduleService','$timeout','$window','$anchorScroll','$document', function($scope, $routeParams, $location, $resource,wsfScheduleService,$timeout,$window,$anchorScroll,$document) {
    //console.log("routeParams: ",$routeParams)
    $scope.viewClass = 'times';
    $scope.departingId = $routeParams.departingId;
    $scope.arrivingId = $routeParams.arrivingId;
    $scope.$watch("terminalApi",function(newData,oldData){
        $scope.setTitle($scope.getTerminalNameFromId($scope.departingId)+" - " + $scope.getTerminalNameFromId($scope.arrivingId));
    });

    $scope.timesApi = {};
    $scope.validDateRangeApi = {};
    $scope.nextTimeFound = false;

    $scope.isBoatGone = function(time){
        $scope.beforeTime  = moment(time).unix().valueOf() < moment().unix().valueOf()?true:false;
        if($scope.beforeTime){
            return true;
        }
        return false;
    }
    $scope.isAmTime = function(time){
        return moment(time).format('a') == 'am';
    }

    wsfScheduleService.getSchedule($scope.departingId,$scope.arrivingId).then(function(response){
        $scope.timesApi =  response.data;
        console.log("Schedule Response",response.data)
    },function(error){
        //$scope.terminalApi =  error;
        console.log("Error: ",error);
    });
    $scope.reverseSchedule = function(){
        //console.log();
        var pathArray = $location.path().split("/");
        console.log(pathArray)
        $location.path(pathArray[1]+"/"+pathArray[3]+"/"+pathArray[2])
    }

    $scope.$watch("timesApi",function(newData,oldData){

        if(newData != oldData){
            $scope.Schedule =  newData;
            $scope.Times =  newData.TerminalCombos[0].Times;

            $timeout(function(){
                $(".boat-gone").eq(-3).attr("id","scrollto")

                if($(".times-list")) {
                    if($('.boat-available').length > 1){
                        $('.boat-available').first().addClass('active')
                    }else{
                        $('.boat-available').addClass('active')
                    }
                    $('.boat-available').first().addClass('active')
                }
                if($(".boat-gone")) {
                    $('html,body').animate({
                        scrollTop: $scope.nextBoatOffset
                    }, 200);
                }
                $anchorScroll("scrollto")

            },500);

        }

    });


}]);
