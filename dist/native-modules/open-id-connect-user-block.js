import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { autoinject, customElement } from "aurelia-framework";
import OpenIdConnect from "./open-id-connect";
var default_1 = (function () {
    function default_1(openIdConnect) {
        this.openIdConnect = openIdConnect;
        this.user = null;
    }
    Object.defineProperty(default_1.prototype, "isLoggedIn", {
        get: function () {
            return this.user !== null && this.user !== undefined;
        },
        enumerable: false,
        configurable: true
    });
    default_1.prototype.attached = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.openIdConnect.addOrRemoveHandler("addUserUnloaded", function () {
                            _this.user = null;
                        });
                        this.openIdConnect.addOrRemoveHandler("addUserLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this;
                                        return [4, this.openIdConnect.getUser()];
                                    case 1:
                                        _a.user = _b.sent();
                                        return [2];
                                }
                            });
                        }); });
                        _a = this;
                        return [4, this.openIdConnect.getUser()];
                    case 1:
                        _a.user = _b.sent();
                        return [2];
                }
            });
        });
    };
    default_1.prototype.login = function () {
        this.openIdConnect.login();
    };
    default_1.prototype.logout = function () {
        this.openIdConnect.logout();
    };
    default_1 = __decorate([
        autoinject,
        customElement("open-id-connect-user-block"),
        __metadata("design:paramtypes", [OpenIdConnect])
    ], default_1);
    return default_1;
}());
export default default_1;

//# sourceMappingURL=open-id-connect-user-block.js.map
