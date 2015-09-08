app.service('routesService',function($http,$q) {
    return ({
        api_root: "http://www.wsdot.wa.gov/ferries/api",
        api_key: "beae0283-3493-4760-9997-04b1c32a23e2",
        api_terminals: "/route/rest",
        api_vessel_cache_key: "vesselCache",
        getCacheFlushDate : function(){
            var url = this.api_root + this.api_terminals + "/cacheflushdate?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getVesselLocations : function(vars){
            var url = this.api_root + this.api_terminals + "/vessellocations?callback=JSON_CALLBACK&apiaccesscode=" + this.api_key,
                promise = null;
            console.log(url)
            if (promise) {
                return promise;
            } else {
                promise = $http.jsonp(url);
                return promise;
            }
        },
        getVesselServices :function(){
            moment.tz.setDefault('America/Los_Angeles');
            var deferred = $q.defer();
            var _self = this;
            _self.now = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
            _self.vesselServices = {};
            _self.getCacheFlushDate().then(function(response){
                var storedFlushDate = null;
                if(amplify.store(_self.api_vessel_cache_key)){
                    storedFlushDate = amplify.store(_self.api_vessel_cache_key).FlushDate;
                }
                //_self.terminalServices['CachedData'] = (moment(response.data).unix().valueOf() > storedFlushDate);
                console.log("Get New Vessel Data: ",moment(response.data).unix().valueOf() > storedFlushDate)
                if(moment(response.data).unix().valueOf() > storedFlushDate ) {
                    _self.vesselServices['FlushDate'] = moment(response.data).unix().valueOf();
                    _self.getVesselLocations().then(function (response) {
                        _self.vesselServices['VesselLocations'] = response.data;
                        var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                        var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                        // _self.terminalServices['ResponseTime'] = duration;
                        //_self.terminalServices['CachedData'] = false;
                        amplify.store(_self.api_vessel_cache_key, _self.vesselServices);
                        deferred.resolve(_self.vesselServices);
                    })
                }else{
                    _self.vesselServices = amplify.store(_self.api_vessel_cache_key);
                    //_self.terminalServices['CachedData'] = true;
                    var then = moment().format('DD/MM/YYYY HH:mm:ss.SSS');
                    var duration = moment(moment(then, 'DD/MM/YYYY HH:mm:ss.SSS').diff(moment(_self.now, 'DD/MM/YYYY HH:mm:ss.SSS'))).format('mm:ss.SSS')
                    //_self.terminalServices['ResponseTime'] = duration;
                    deferred.resolve(_self.vesselServices);
                }
            });
            return deferred.promise;
        }
    });
});