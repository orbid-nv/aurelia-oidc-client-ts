"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_router_1 = require("aurelia-router");
var oidc_client_ts_1 = require("oidc-client-ts");
var open_id_connect_configuration_manager_1 = tslib_1.__importDefault(require("./open-id-connect-configuration-manager"));
var open_id_connect_constants_1 = require("./open-id-connect-constants");
var open_id_connect_logger_1 = tslib_1.__importDefault(require("./open-id-connect-logger"));
var open_id_connect_routing_1 = tslib_1.__importDefault(require("./open-id-connect-routing"));
var OpenIdConnect = (function () {
    function OpenIdConnect(openIdConnectRouting, router, configuration, logger, userManager) {
        this.openIdConnectRouting = openIdConnectRouting;
        this.router = router;
        this.configuration = configuration;
        this.logger = logger;
        this.userManager = userManager;
    }
    OpenIdConnect.prototype.configure = function (routerConfiguration) {
        if (typeof routerConfiguration === "undefined" ||
            routerConfiguration === null) {
            throw new Error("routerConfiguration parameter must not be undefined or null");
        }
        this.openIdConnectRouting.configureRouter(routerConfiguration);
    };
    OpenIdConnect.prototype.login = function (args) {
        if (args === void 0) { args = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loginRedirectValue;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.router.currentInstruction) {
                            loginRedirectValue = this.router.currentInstruction.queryParams[open_id_connect_constants_1.LoginRedirectKey];
                            if (loginRedirectValue) {
                                args.data = tslib_1.__assign({}, args.data);
                                args.data[open_id_connect_constants_1.LoginRedirectKey] = loginRedirectValue;
                            }
                        }
                        return [4, this.userManager.signinRedirect(args)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OpenIdConnect.prototype.logout = function (args) {
        if (args === void 0) { args = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userManager.signoutRedirect(args)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.message === "no end session endpoint") {
                            this.logger.debug(err_1);
                            this.logger.debug("The user remains logged in at the authorization server.");
                            this.router.navigate(this.configuration.logoutRedirectRoute);
                        }
                        else {
                            throw err_1;
                        }
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    OpenIdConnect.prototype.loginSilent = function (args) {
        if (args === void 0) { args = {}; }
        return this.userManager.signinSilent(args);
    };
    OpenIdConnect.prototype.getUser = function () {
        return this.userManager.getUser();
    };
    OpenIdConnect.prototype.addOrRemoveHandler = function (key, handler) {
        if (!key.startsWith("add") && !key.startsWith("remove")) {
            var message = "The 'addOrRemoveHandlers' method expects a 'key' argument ";
            message += "that starts with either 'add' or 'remove'. Instead we ";
            message += "recevied " + key;
            throw new TypeError(message);
        }
        var addOrRemove = this.userManager.events[key];
        addOrRemove.call(this.userManager.events, handler);
    };
    OpenIdConnect.prototype.observeUser = function (callback) {
        var _this = this;
        this.addOrRemoveHandler("addUserLoaded", function () {
            return _this.getUser().then(callback);
        });
        this.addOrRemoveHandler("addUserUnloaded", function () {
            return _this.getUser().then(callback);
        });
        return this.getUser().then(callback);
    };
    OpenIdConnect = tslib_1.__decorate([
        aurelia_framework_1.autoinject,
        tslib_1.__metadata("design:paramtypes", [open_id_connect_routing_1.default,
            aurelia_router_1.Router,
            open_id_connect_configuration_manager_1.default,
            open_id_connect_logger_1.default,
            oidc_client_ts_1.UserManager])
    ], OpenIdConnect);
    return OpenIdConnect;
}());
exports.default = OpenIdConnect;

//# sourceMappingURL=open-id-connect.js.map
