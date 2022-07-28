"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var oidc_client_ts_1 = require("oidc-client-ts");
var open_id_connect_configuration_manager_1 = tslib_1.__importDefault(require("./open-id-connect-configuration-manager"));
var open_id_connect_logger_1 = tslib_1.__importDefault(require("./open-id-connect-logger"));
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.createOpenIdConnectConfiguration = function (dto) {
        return new open_id_connect_configuration_manager_1.default(dto);
    };
    default_1.prototype.createOpenIdConnectLogger = function (level) {
        return new open_id_connect_logger_1.default(level);
    };
    default_1.prototype.createUserManager = function (settings) {
        return new oidc_client_ts_1.UserManager(settings);
    };
    return default_1;
}());
exports.default = default_1;

//# sourceMappingURL=open-id-connect-factory.js.map
