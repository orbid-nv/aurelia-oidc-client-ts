// import { FrameworkConfiguration } from "aurelia-framework";
// import { PLATFORM } from "aurelia-pal";

// export function configure(config: FrameworkConfiguration): void {
//   config.globalResources([]);
// }

import OpenIdConnect from "./open-id-connect";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectRoles from "./open-id-connect-roles";
// by convention, the plugin is named `configure`
import configure from "./plugin";

export {
  configure,
  OpenIdConnect,
  OpenIdConnectRoles,
  OpenIdConnectConfiguration,
};
