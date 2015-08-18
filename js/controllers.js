

app.controller('applicationController',['$http','$scope','$timeout','$window','wsfTerminalService', function($http,$scope,$timeout,$window,wsfTerminalService) {

    wsfTerminalService.getTerminalServices().then(function(results){
        console.log(results)
    })



}]);