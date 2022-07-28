import { __decorate, __metadata } from "tslib";
import { autoinject } from 'aurelia-framework';
import OpenIdConnectAuthorizeStep from './open-id-connect-authorize-step';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
import OpenIdConnectNavigationStrategies from './open-id-connect-navigation-strategies';
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
        routerConfiguration.addPipelineStep('authorize', OpenIdConnectAuthorizeStep);
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
    OpenIdConnectRouting = __decorate([
        autoinject,
        __metadata("design:paramtypes", [OpenIdConnectConfigurationManager,
            OpenIdConnectNavigationStrategies,
            Window,
            OpenIdConnectLogger])
    ], OpenIdConnectRouting);
    return OpenIdConnectRouting;
}());
export default OpenIdConnectRouting;

//# sourceMappingURL=open-id-connect-routing.js.map
