import { __awaiter, __decorate, __extends, __generator } from "tslib";
import { autoinject, customElement } from 'aurelia-framework';
import OpenIdConnectUserBlock from './open-id-connect-user-block';
var default_1 = (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.loginSilent = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    default_1 = __decorate([
        autoinject,
        customElement('open-id-connect-user-debug')
    ], default_1);
    return default_1;
}(OpenIdConnectUserBlock));
export default default_1;

//# sourceMappingURL=open-id-connect-user-debug.js.map
