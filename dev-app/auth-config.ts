import environment from "./environment";
import { Log, UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";
import { OpenIdConnectConfiguration } from "resources";

export class OidcConfig extends OpenIdConnectConfiguration {
  constructor() {
    super();
    this.loginRedirectRoute = "/";
    this.logoutRedirectRoute = "/logged-out";
    this.unauthorizedRedirectRoute = "/logged-out";
    this.logLevel = Log.DEBUG;
    this.userManagerSettings = {
      accessTokenExpiringNotificationTime: 20,
      authority: environment.stsUrl,
      automaticSilentRenew: true,
      monitorSession: true,
      checkSessionInterval: 2000,
      // The client or application ID that the authority issues.
      client_id: environment.client_id,
      filterProtocolClaims: true,
      loadUserInfo: true,
      post_logout_redirect_uri: `${environment.appUrl}/signout-oidc`,
      redirect_uri: `${environment.appUrl}/signin-callback`,
      // popup_post_logout_redirect_uri: `${environment.appUrl}/logout-popup.html`,
      // popup_redirect_uri: `${environment.appUrl}/login-popup.html`,
      response_type: "code",
      scope: "openid profile email api",
      // number of millisecods to wait for the authorization
      // server to response to silent renew request
      silentRequestTimeout: 10000,
      // silent_redirect_uri: `${environment.appUrl}/login-silent.html`,
      userStore: new WebStorageStateStore({
        prefix: "oidc",
        store: (window as any).localStorage,
      }),
    } as UserManagerSettings;
  }
}
