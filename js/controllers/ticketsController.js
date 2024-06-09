app.controller("ticketsController",["$scope","$http",'$routeParams','$location', '$resource',function($scope,$http,$routeParams,$location,$resource){
    $scope.ticketUrl = "";
    $scope.ticketData = {};
    $scope.ticketData.History = [];
    $scope.setViewClass("tickets");
    $scope.setTitle("Ticket Lookup");
    if($routeParams.ticketId){
        $scope.ticketId=$routeParams.ticketId;
    }


    //var template = '<div class="container-fluid">\n\
    //                        <div class="row">\n\
    //                            <div class="col-xs-12">\n\
    //                                <div class="input-group input-group-sm" ng-click="$event.stopPropagation()"> \n\
    //                                      <span class="input-group-addon">\n\
    //                                          <span class="fa fa-ticket" ng-click="showDatePicker()"></span>\n\
    //                                       </span>\n\
    //                                       <input type="text" class="form-control ticketForm" ng-model="ticketId" value="5123410116262536621495" />\n\
    //                                </div>\n\
    //                            </div>\n\
    //                        </div>\n\
    //                    </div>'
    $scope.setListHeader(false,'');
    $scope.showListHeader = false;
    $scope.setSubNav(false);
    console.log("Route Params",$routeParams)

    if($routeParams.ticketId != null) {
        $scope.ticketUrl = "http://wsf.myclient.com/tickets/lookup-iphone.php?tid="+$routeParams.ticketId+"&o=json&callback=JSON_CALLBACK";
        console.log($scope.ticketUrl)

        $http({ method: 'JSONP',
	        	url:$scope.ticketUrl,
	        	headers: {
		        	'User': 'WSF webapp v1.0',
		        	'Content-Type': 'application/json'
	        	}
	        }).then(function (response) {
            console.log("%&%&%&%&%&%&%&%&%: ", response.data)
            $scope.ticketData = response.data;
            $("#barcode").JsBarcode($routeParams.ticketId);
        }, function (error) {
            console.log("ERROR: ", error)
        });



    }
    $scope.ticketLookup = function(ticketId){
        //$scope.ticketData.History = [];
        var url = "/tickets/"+ticketId;
        $location.path(url);
    }
}])