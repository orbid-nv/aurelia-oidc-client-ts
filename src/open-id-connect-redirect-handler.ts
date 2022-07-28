import { UserManager } from "oidc-client-ts";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default interface OpenIdConnectRedirectHandler {
  (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
