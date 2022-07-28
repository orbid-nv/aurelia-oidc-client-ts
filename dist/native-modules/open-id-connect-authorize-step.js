import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { autoinject } from "aurelia-framework";
import { Redirect, } from "aurelia-router";
import { UserManager } from "oidc-client-ts";
import OpenIdConnectConfigurationManager from "./open-id-connect-configuration-manager";
import { LoginRedirectKey } from "./open-id-connect-constants";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRoles from "./open-id-connect-roles";
var OpenIdConnectAuthorizeStep = (function () {
    function OpenIdConnectAuthorizeStep(userManager, configuration, logger) {
        this.userManager = userManager;
        this.configuration = configuration;
        this.logger = logger;
    }
    OpenIdConnectAuthorizeStep.prototype.run = function (navigationInstruction, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, loginRedirect, loginRedirectValue, queryString, redirect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userManager.getUser()];
                    case 1:
                        user = _a.sent();
                        if (this.requiresRole(navigationInstruction, OpenIdConnectRoles.Authenticated)) {
                            if (user === null || user.expired) {
                                this.logger.debug("Requires authenticated role.");
                                loginRedirect = navigationInstruction.fragment;
                                if (navigationInstruction.queryString &&
                                    navigationInstruction.queryString.length) {
                                    loginRedirect += "?".concat(navigationInstruction.queryString);
                                }
                                loginRedirectValue = encodeURIComponent(loginRedirect);
                                queryString = "?".concat(LoginRedirectKey, "=").concat(loginRedirectValue);
                                redirect = new Redirect(this.configuration.unauthorizedRedirectRoute + queryString);
                                return [2, next.cancel(redirect)];
                            }
                        }
                        return [2, next()];
                }
            });
        });
    };
    OpenIdConnectAuthorizeStep.prototype.requiresRole = function (navigationInstruction, role) {
        var instructions = navigationInstruction.getAllInstructions();
        return instructions.some(function (instruction) {
            return instruction !== undefined &&
                instruction.config !== undefined &&
                instruction.config.settings !== undefined &&
                instruction.config.settings.roles !== undefined &&
                instruction.config.settings.roles.includes(role);
        });
    };
    OpenIdConnectAuthorizeStep = __decorate([
        autoinject,
        __metadata("design:paramtypes", [UserManager,
            OpenIdConnectConfigurationManager,
            OpenIdConnectLogger])
    ], OpenIdConnectAuthorizeStep);
    return OpenIdConnectAuthorizeStep;
}());
export default OpenIdConnectAuthorizeStep;

//# sourceMappingURL=open-id-connect-authorize-step.js.map
