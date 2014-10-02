var dropletServices = angular.module('dropletServices', ['ngResource']);

dropletServices.factory('Droplet', ['$resource', '$rootScope',
    function($resource, $rootScope){
        return $resource('https://api.digitalocean.com/v2/droplets/:dropletId', {}, {
            query: {method:'GET', isArray:false, headers:{"Authorization": "Bearer "+$rootScope.APIKEY}},
            get: {method:'GET', isArray:false, headers:{"Authorization": "Bearer "+$rootScope.APIKEY}}
        });
    }]);