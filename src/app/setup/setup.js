(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('setup', {
            url: '/setup',
            views: {
                "main": {
                    controller: 'SetupController',
                    templateUrl: 'setup/setup.tpl.html'
                }
            },
            data:{ pageTitle: 'SaltySea' }
        });
    });

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    app.controller('SetupController', ['$scope', '$rootScope', '$state', '$http', '$q', 'configService', function ($scope, $rootScope, $state, $http, $q, configService) {
        $scope.setup = {};
        $scope.setup.errors = {};
        $scope.config = configService;
        $scope.setup.update = function() {
            var salt_valid = false;
            var do_valid = false;
            var config_check = $q.all(
                // Check To make sure Token
                $http.get($scope.config.urls.salt+"/token_check", {"headers": {"Authorization": "Token " + $scope.config.keys.salt }}).success(function(response) {
                    salt_valid = true;
                }).error(function(response) {
                    $scope.setup.errors.salt = "Incorrect Salt Configuration";
                }),
                $http.get("https://api.digitalocean.com/v2/actions?per_page=1", {"headers": {"Authorization": "Bearer " + $scope.config.keys.digital_ocean }}).success(function(response) {
                    do_valid = true;
                }).error(function(response) {
                    $scope.setup.errors.digital_ocean = "Incorrect DigitalOcean API Key";
                })
            );
            config_check.then(function() {
                if(salt_valid && do_valid) {
                    $scope.config.SaveState();
                    $state.go('home');
                }
            });

        };
        var init = function() {


        };
        init();
    }]);

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("salty-sea.setup", [
    'ui.router',
    'configService'
])));