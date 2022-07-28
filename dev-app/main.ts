import { Aurelia } from "aurelia-framework";
import { config } from "process";
import { OidcConfig } from "./auth-config";
import environment from "./environment";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature("resources", () => new OidcConfig());

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");
  // aurelia.use.plugin("aurelia-oidc-client", () => new OidcConfig());

  if (environment.testing) {
    aurelia.use.plugin("aurelia-testing");
  }

  aurelia.start().then(() => aurelia.setRoot());
}
