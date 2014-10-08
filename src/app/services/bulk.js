(function(app) {
    app.factory('BulkActions', ['$rootScope', 'Droplet', 'configService', function ($rootScope, Droplet, configService) {
        return function(droplets) {
            var bulk_actions = {};
            bulk_actions.droplets = droplets;

            bulk_actions.delete = function() {
                var droplet_service = new Droplet(configService.keys.digital_ocean);
                angular.forEach( bulk_actions.droplets, function(d, i) {
                    droplet_service.delete({dropletId: d.id});

                });
            };
            return bulk_actions;

        };
    }]);
})(angular.module("bulkActions", [
    'dropletService',
    'configService'
]));