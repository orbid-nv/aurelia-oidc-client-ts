import { __decorate } from "tslib";
import { valueConverter } from "aurelia-framework";
import OpenIdConnectRoles from "./open-id-connect-roles";
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
            if (requiredRoles.includes(OpenIdConnectRoles.Authenticated)) {
                return user !== null;
            }
            if (requiredRoles.includes(OpenIdConnectRoles.Anonymous)) {
                return user == null;
            }
            return true;
        });
    };
    default_1 = __decorate([
        valueConverter("openIdConnectNavigationFilter")
    ], default_1);
    return default_1;
}());
export default default_1;

//# sourceMappingURL=open-id-connect-navigation-filter.js.map
