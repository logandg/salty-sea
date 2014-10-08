(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('droplet', {
            url: '/droplet/:dropletId',
            views: {
                "main": {
                    controller: 'DropletController',
                    templateUrl: 'droplet/droplet.tpl.html'
                }
            },
            data:{ pageTitle: 'SaltySea - Droplet {{dropletid}}' }
        });
    });

    app.controller('DropletController', ['$scope', '$rootScope', '$stateParams', 'Droplet', 'configService', function ($scope, $rootScope, $stateParams, Droplet, configService) {


        $scope.config = configService;
        $scope.droplet_resource = new Droplet($scope.config.keys.digital_ocean).get({dropletId: $stateParams.dropletId}, function(){
            $scope.droplet = $scope.droplet_resource.droplet;
        });

        var init = function() {


        };
        init();
    }]);


}(angular.module("salty-sea.droplet", [
    'ui.router',
    'dropletService',
    'configService'
])));