//app.factory('wsfService',["$http", function($http) {
//    var promise = null,
//        api_root="http://www.wsdot.wa.gov/ferries/api",
//        api_key="beae0283-3493-4760-9997-04b1c32a23e2",
//        api_terminals="/terminals/rest",
//        api_schedules="/schedule/rest",
//        url = api_root + api_terminals + "/cacheflushdate?callback=JSON_CALLBACK&api_key=" + api_key;
//    return function() {
//        if (promise) {
//            return promise;
//        } else {
//            promise = $http.get(url);
//            return promise;
//        }
//    };
//}]);