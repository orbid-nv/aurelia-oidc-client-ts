"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var open_id_connect_user_block_1 = tslib_1.__importDefault(require("./open-id-connect-user-block"));
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.loginSilent = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                try {
                    this.openIdConnect.loginSilent();
                }
                catch (err) {
                    if (err.error !== 'login_required') {
                        throw err;
                    }
                    this.login();
                }
                return [2];
            });
        });
    };
    Object.defineProperty(default_1.prototype, "stringifiedUser", {
        get: function () {
            return JSON.stringify(this.user, undefined, 2);
        },
        enumerable: false,
        configurable: true
    });
    default_1 = tslib_1.__decorate([
        aurelia_framework_1.autoinject,
        (0, aurelia_framework_1.customElement)('open-id-connect-user-debug')
    ], default_1);
    return default_1;
}(open_id_connect_user_block_1.default));
exports.default = default_1;

//# sourceMappingURL=open-id-connect-user-debug.js.map
