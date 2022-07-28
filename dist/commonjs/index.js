"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenIdConnectConfiguration = exports.OpenIdConnectRoles = exports.OpenIdConnect = exports.configure = void 0;
var tslib_1 = require("tslib");
var open_id_connect_1 = tslib_1.__importDefault(require("./open-id-connect"));
exports.OpenIdConnect = open_id_connect_1.default;
var open_id_connect_configuration_1 = tslib_1.__importDefault(require("./open-id-connect-configuration"));
exports.OpenIdConnectConfiguration = open_id_connect_configuration_1.default;
var open_id_connect_roles_1 = tslib_1.__importDefault(require("./open-id-connect-roles"));
exports.OpenIdConnectRoles = open_id_connect_roles_1.default;
var plugin_1 = tslib_1.__importDefault(require("./plugin"));
exports.configure = plugin_1.default;

//# sourceMappingURL=index.js.map
