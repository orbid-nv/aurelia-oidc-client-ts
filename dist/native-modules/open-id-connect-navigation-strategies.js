import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { autoinject } from "aurelia-framework";
import { UserManager } from "oidc-client-ts";
import OpenIdConnectConfigurationManager from "./open-id-connect-configuration-manager";
import { LoginRedirectKey } from "./open-id-connect-constants";
import OpenIdConnectLogger from "./open-id-connect-logger";
var OpenIdConnectNavigationStrategies = (function () {
    function OpenIdConnectNavigationStrategies(logger, openIdConnectConfiguration, userManager, $window) {
        this.logger = logger;
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.userManager = userManager;
        this.$window = $window;
    }
    OpenIdConnectNavigationStrategies.prototype.signInRedirectCallback = function (instruction) {
        return __awaiter(this, void 0, void 0, function () {
            var redirectRoute, callbackHandler, navigationInstruction;
            var _this = this;
            return __generator(this, function (_a) {
                redirectRoute = this.openIdConnectConfiguration.loginRedirectRoute;
                callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
                    var user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.userManager.signinRedirectCallback()];
                            case 1:
                                user = _a.sent();
                                if (user.state && user.state[LoginRedirectKey]) {
                                    redirectRoute = user.state[LoginRedirectKey];
                                }
                                return [2];
                        }
                    });
                }); };
                navigationInstruction = function () {
                    return _this.redirectAfterCallback(instruction, redirectRoute);
                };
                return [2, this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction)];
            });
        });
    };
    OpenIdConnectNavigationStrategies.prototype.silentSignInCallback = function (instruction) {
        var _this = this;
        var callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.userManager.signinSilentCallback()];
            });
        }); };
        var navigationInstruction = function () {
            instruction.config.redirect =
                _this.openIdConnectConfiguration.loginRedirectRoute;
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    };
    OpenIdConnectNavigationStrategies.prototype.signOutRedirectCallback = function (instruction) {
        var _this = this;
        var callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            var args;
            return __generator(this, function (_a) {
                args = {};
                return [2, this.userManager.signoutRedirectCallback(args)];
            });
        }); };
        var navigationInstruction = function () {
            return _this.redirectAfterCallback(instruction, _this.openIdConnectConfiguration.logoutRedirectRoute);
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    };
    OpenIdConnectNavigationStrategies.prototype.redirectAfterCallback = function (instruction, route) {
        this.$window.history.pushState({}, "", route);
        instruction.config.redirect = route;
    };
    OpenIdConnectNavigationStrategies.prototype.runHandlerAndCompleteNavigationInstruction = function (callbackHandler, navigationInstruction) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug("Handling the response from the Identity Provider");
                        return [4, callbackHandler()];
                    case 1:
                        _a.sent();
                        this.logger.debug("Redirecting on authorization success");
                        navigationInstruction();
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.logger.debug("Redirecting on authorization error");
                        navigationInstruction();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    OpenIdConnectNavigationStrategies = __decorate([
        autoinject,
        __metadata("design:paramtypes", [OpenIdConnectLogger,
            OpenIdConnectConfigurationManager,
            UserManager,
            Window])
    ], OpenIdConnectNavigationStrategies);
    return OpenIdConnectNavigationStrategies;
}());
export default OpenIdConnectNavigationStrategies;

//# sourceMappingURL=open-id-connect-navigation-strategies.js.map
