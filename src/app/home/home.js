/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 */
(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeController',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data:{ pageTitle: 'SaltySea Home' }
        });
    });

    // As you add controllers to a module and they grow in size, feel free to place them in their own files.
    //  Let each module grow organically, adding appropriate organization and sub-folders as needed.
    app.controller('HomeController', ['$scope', '$rootScope', '$state', 'Droplet', 'configService', 'BulkActions', function ($scope, $rootScope, $state, Droplet, configService, BulkActions) {


        $scope.config = configService;

        $scope.bulk_actions_list = [
            {name: 'Delete', warning: "Will all be deleted", action: function(selected_droplets) { var bulk = new BulkActions(selected_droplets); bulk.delete();}},
        ];
        $scope.selected_bulk_action = null;
        var init = function() {


            if (!$scope.config.keys.digital_ocean  || !$scope.config.keys.salt || !$scope.config.urls.salt) {

                $state.go('setup');
            }
            else {
                $scope.droplet_resource = new Droplet(configService.keys.digital_ocean).query();

            }
        };
        $scope.takeBulkAction = function () {
            var droplets_to_act_upon = [];
            angular.forEach($scope.droplet_resource.droplets, function(d, i){
                if (d.selected) {
                    droplets_to_act_upon.push(d);
                }
            });

            if (droplets_to_act_upon.length > 0) {
                var confirm_text = "Are you sure you want to do this?\n\n";
                angular.forEach(droplets_to_act_upon, function (d, i) {
                    confirm_text += d.name + "\n";
                });
                confirm_text += "\n" + $scope.selected_bulk_action.warning;

                if (confirm(confirm_text)) {
                    $scope.selected_bulk_action.action(droplets_to_act_upon);
                    $state.transitionTo($state.current, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            }
            else {
                alert("No droplets were selected");
            }

        };
        init();
    }]);

// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("salty-sea.home", [
    'ui.router',
    'dropletService',
    'configService',
    'bulkActions'
])));