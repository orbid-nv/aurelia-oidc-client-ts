"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_router_1 = require("aurelia-router");
var oidc_client_ts_1 = require("oidc-client-ts");
var open_id_connect_configuration_manager_1 = tslib_1.__importDefault(require("./open-id-connect-configuration-manager"));
var open_id_connect_constants_1 = require("./open-id-connect-constants");
var open_id_connect_logger_1 = tslib_1.__importDefault(require("./open-id-connect-logger"));
var open_id_connect_roles_1 = tslib_1.__importDefault(require("./open-id-connect-roles"));
var OpenIdConnectAuthorizeStep = (function () {
    function OpenIdConnectAuthorizeStep(userManager, configuration, logger) {
        this.userManager = userManager;
        this.configuration = configuration;
        this.logger = logger;
    }
    OpenIdConnectAuthorizeStep.prototype.run = function (navigationInstruction, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, loginRedirect, loginRedirectValue, queryString, redirect;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userManager.getUser()];
                    case 1:
                        user = _a.sent();
                        if (this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Authenticated)) {
                            if (user === null || user.expired) {
                                this.logger.debug("Requires authenticated role.");
                                loginRedirect = navigationInstruction.fragment;
                                if (navigationInstruction.queryString &&
                                    navigationInstruction.queryString.length) {
                                    loginRedirect += "?".concat(navigationInstruction.queryString);
                                }
                                loginRedirectValue = encodeURIComponent(loginRedirect);
                                queryString = "?".concat(open_id_connect_constants_1.LoginRedirectKey, "=").concat(loginRedirectValue);
                                redirect = new aurelia_router_1.Redirect(this.configuration.unauthorizedRedirectRoute + queryString);
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
    OpenIdConnectAuthorizeStep = tslib_1.__decorate([
        aurelia_framework_1.autoinject,
        tslib_1.__metadata("design:paramtypes", [oidc_client_ts_1.UserManager,
            open_id_connect_configuration_manager_1.default,
            open_id_connect_logger_1.default])
    ], OpenIdConnectAuthorizeStep);
    return OpenIdConnectAuthorizeStep;
}());
exports.default = OpenIdConnectAuthorizeStep;

//# sourceMappingURL=open-id-connect-authorize-step.js.map
