import { Log } from "oidc-client-ts";
var OpenIdConnectLogger = (function () {
    function OpenIdConnectLogger(level) {
        this._level = Log.NONE;
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
        if (this.level >= Log.DEBUG) {
            console.debug("DEBUG [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.info = function (msg) {
        if (this.level >= Log.INFO) {
            console.info("INFO [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.warn = function (msg) {
        if (this.level >= Log.WARN) {
            console.warn("WARN [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.error = function (msg) {
        if (this.level >= Log.ERROR) {
            console.error("ERROR [OpenIdConnect] ".concat(msg));
        }
    };
    OpenIdConnectLogger.prototype.setLogLevel = function (level) {
        var validOidcClientLevels = [
            Log.DEBUG,
            Log.INFO,
            Log.WARN,
            Log.ERROR,
            Log.NONE,
        ];
        if (!validOidcClientLevels.includes(level)) {
            var levels = validOidcClientLevels.join(", ");
            var msg = "The log level must be one of ".concat(levels);
            throw new RangeError(msg);
        }
        this._level = level;
        Log.setLevel(level);
        Log.setLogger(console);
    };
    return OpenIdConnectLogger;
}());
export default OpenIdConnectLogger;

//# sourceMappingURL=open-id-connect-logger.js.map
