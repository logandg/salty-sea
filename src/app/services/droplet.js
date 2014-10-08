var dropletService = angular.module('dropletService', ['ngResource']);

dropletService.factory('Droplet', ['$resource', '$rootScope', 'configService',
    function($resource, $rootScope, configService){
        return function(token) {
            return $resource('https://api.digitalocean.com/v2/droplets/:dropletId', {}, {
                query: {method:'GET', isArray:false, headers:{"Authorization": "Bearer "+token}},
                get: {method:'GET', isArray:false, headers:{"Authorization": "Bearer "+token}},
                delete: {method:'DELETE', isArray:false, headers:{"Authorization": "Bearer "+token}}
            });
        };
    }]);