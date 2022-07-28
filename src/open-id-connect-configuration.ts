import { UserManagerSettings } from "oidc-client-ts";

export default class OpenIdConnectConfiguration {
  [key: string]: any;
  public loginRedirectRoute: string;
  public logoutRedirectRoute: string;
  public unauthorizedRedirectRoute: string;
  public logLevel: number;
  public userManagerSettings: UserManagerSettings;
}
