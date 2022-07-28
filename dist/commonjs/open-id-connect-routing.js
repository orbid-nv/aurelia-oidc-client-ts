"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var open_id_connect_authorize_step_1 = tslib_1.__importDefault(require("./open-id-connect-authorize-step"));
var open_id_connect_configuration_manager_1 = tslib_1.__importDefault(require("./open-id-connect-configuration-manager"));
var open_id_connect_logger_1 = tslib_1.__importDefault(require("./open-id-connect-logger"));
var open_id_connect_navigation_strategies_1 = tslib_1.__importDefault(require("./open-id-connect-navigation-strategies"));
var OpenIdConnectRouting = (function () {
    function OpenIdConnectRouting(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, logger) {
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.openIdConnectNavigationStrategies = openIdConnectNavigationStrategies;
        this.$window = $window;
        this.logger = logger;
    }
    OpenIdConnectRouting.prototype.configureRouter = function (routerConfiguration) {
        this.addLoginRedirectRoute(routerConfiguration);
        this.addLogoutRedirectRoute(routerConfiguration);
        routerConfiguration.addPipelineStep('authorize', open_id_connect_authorize_step_1.default);
    };
    OpenIdConnectRouting.prototype.addLoginRedirectRoute = function (routerConfiguration) {
        var _this = this;
        routerConfiguration.mapRoute({
            name: 'logInRedirectCallback',
            navigationStrategy: function (instruction) {
                if (_this.isSilentLogin()) {
                    return _this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
                }
                else {
                    return _this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                }
            },
            route: this.getPath(this.openIdConnectConfiguration.redirectUri)
                .replace(routerConfiguration.options.root || '/', '/'),
        });
    };
    OpenIdConnectRouting.prototype.addLogoutRedirectRoute = function (routerConfiguration) {
        var _this = this;
        routerConfiguration.mapRoute({
            name: 'logOutRedirectCallback',
            navigationStrategy: function (instruction) {
                return _this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri)
                .replace(routerConfiguration.options.root || '/', '/'),
        });
    };
    OpenIdConnectRouting.prototype.isSilentLogin = function () {
        try {
            return this.$window.self !== this.$window.top;
        }
        catch (e) {
            return true;
        }
    };
    OpenIdConnectRouting.prototype.getPath = function (uri) {
        return this.convertUriToAnchor(uri).pathname;
    };
    OpenIdConnectRouting.prototype.convertUriToAnchor = function (uri) {
        var anchor = document.createElement('a');
        anchor.href = uri;
        return anchor;
    };
    OpenIdConnectRouting = tslib_1.__decorate([
        aurelia_framework_1.autoinject,
        tslib_1.__metadata("design:paramtypes", [open_id_connect_configuration_manager_1.default,
            open_id_connect_navigation_strategies_1.default,
            Window,
            open_id_connect_logger_1.default])
    ], OpenIdConnectRouting);
    return OpenIdConnectRouting;
}());
exports.default = OpenIdConnectRouting;

//# sourceMappingURL=open-id-connect-routing.js.map
