"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var aurelia_framework_1 = require("aurelia-framework");
var open_id_connect_roles_1 = tslib_1.__importDefault(require("./open-id-connect-roles"));
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.toView = function (navModels, user) {
        return navModels.filter(function (navModel) {
            if (!navModel.settings) {
                return true;
            }
            var requiredRoles = navModel.settings.roles;
            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }
            if (requiredRoles.includes(open_id_connect_roles_1.default.Authenticated)) {
                return user !== null;
            }
            if (requiredRoles.includes(open_id_connect_roles_1.default.Anonymous)) {
                return user == null;
            }
            return true;
        });
    };
    default_1 = tslib_1.__decorate([
        (0, aurelia_framework_1.valueConverter)("openIdConnectNavigationFilter")
    ], default_1);
    return default_1;
}());
exports.default = default_1;

//# sourceMappingURL=open-id-connect-navigation-filter.js.map
