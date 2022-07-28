"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oidc_client_ts_1 = require("oidc-client-ts");
var OpenIdConnectLogger = (function () {
    function OpenIdConnectLogger(level) {
        this._level = oidc_client_ts_1.Log.NONE;
        if (level !== null && level !== undefined) {
            this.setLogLevel(level);
        }
    }
    Object.defineProperty(OpenIdConnectLogger.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: false,
        configurable: true
    });
    OpenIdConnectLogger.prototype.debug = function (msg) {
        if (this.level >= oidc_client_ts_1.Log.DEBUG) {
            console.debug("DEBUG [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.info = function (msg) {
        if (this.level >= oidc_client_ts_1.Log.INFO) {
            console.info("INFO [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.warn = function (msg) {
        if (this.level >= oidc_client_ts_1.Log.WARN) {
            console.warn("WARN [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.error = function (msg) {
        if (this.level >= oidc_client_ts_1.Log.ERROR) {
            console.error("ERROR [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.setLogLevel = function (level) {
        var validOidcClientLevels = [
            oidc_client_ts_1.Log.DEBUG,
            oidc_client_ts_1.Log.INFO,
            oidc_client_ts_1.Log.WARN,
            oidc_client_ts_1.Log.ERROR,
            oidc_client_ts_1.Log.NONE,
        ];
        if (!validOidcClientLevels.includes(level)) {
            var levels = validOidcClientLevels.join(", ");
            var msg = "The log level must be one of ".concat(levels);
            throw new RangeError(msg);
        }
        this._level = level;
        oidc_client_ts_1.Log.setLevel(level);
        oidc_client_ts_1.Log.setLogger(console);
    };
    return OpenIdConnectLogger;
}());
exports.default = OpenIdConnectLogger;

//# sourceMappingURL=open-id-connect-logger.js.map
