# Why?

This plugin is a fork of the `aurelia-open-id-connect` library but uses the `oidc-client-ts` instead of the depracted `oidc-client-js` library.

https://github.com/aurelia-contrib/aurelia-open-id-connect

https://github.com/authts/oidc-client-ts

# Installation

    npm i @orbid/aurelia-oidc-client-ts

# Example usage

## Initialize the plugin

```
aurelia.use
		.standardConfiguration()
		.feature("resources")
		.plugin("@orbid/aurelia-oidc-client-ts", () => new OidcConfig());

    aurelia.start().then(async () => {
		const httpClient: HttpClient = aurelia.container.get(HttpClient);

		const authService = aurelia.container.get(
			AuthenticationService
		) as AuthenticationService;
		const router = aurelia.container.get(Router) as Router;

		httpClient.configure((config) => {
			config.withInterceptor({
				request(req: Request) {
					if (authService.isAuthenticated) {
						req.headers.append(
							"Authorization",
							`Bearer ${authService.user.access_token}`
						);
					}
					return req;
				},
				async response(resp: Response) {
					if (resp.status === 401) {
						authService.signIn();
					}
					if (resp.status === 403) {
						router.navigateToRoute("unauthorized");
					}
					return resp;
				},
			});
		});
```

## Authentication service

```
import { autoinject, computedFrom } from "aurelia-framework";
import { OpenIdConnect } from "@orbid/aurelia-oidc-client-ts";
import { Router } from "aurelia-router";
import { User } from "oidc-client-ts";

@autoinject()
export class AuthenticationService {
	public user: User;
	constructor(private openIdConnect: OpenIdConnect) {
		this.openIdConnect.observeUser(async (u) => {
			this.user = u;
		});
	}
	@computedFrom("user", "user.expired")
	public get isAuthenticated() {
		return this.user && !this.user.expired;
	}

	public async signIn() {
		this.openIdConnect.login();
	}
	public async logOut() {
		this.openIdConnect.logout();
	}
}
```

## Configure router

```
import { Router, RouterConfiguration } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { OpenIdConnect } from "@orbid/aurelia-oidc-client-ts";
@autoinject()
export class App {
	public router: Router;
	constructor(private openIdConnect: OpenIdConnect) {}

	public configureRouter(
		config: RouterConfiguration,
		router: Router
	): Promise<void> | PromiseLike<void> | void {
		config.options.pushState = true;
		config.map([
			{
				route: ["Dashboard"],
				name: "Dashboard",
				moduleId: "./modules/dashboard",
				nav: true,
				title: "Dashboard",
			},
			{
				route: ["unauthorized"],
				moduleId: "unauthorized",
				title: "unauthorized",
				name: "unauthorized",
				nav: false,
			},
		]);

		this.openIdConnect.configure(config);

		this.router = router;
	}
}
```

## Example config

```
import { OpenIdConnectConfiguration } from "@orbid/aurelia-oidc-client-ts";
import environment from "environment";
import { Log, UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";

export class OidcConfig extends OpenIdConnectConfiguration {
	constructor() {
		super();
		this.loginRedirectRoute = "/";
		this.logoutRedirectRoute = "/unauthorized";
		this.unauthorizedRedirectRoute = "/unauthorized";
		this.userManagerSettings = {
			// the number of seconds in advance of access token expiry
			// to raise the access token expiring event.
			accessTokenExpiringNotificationTimeInSeconds: 20,
			authority: environment.stsUrl,
			automaticSilentRenew: true,
			monitorSession: true,
			checkSessionIntervalInSeconds: 2000,
			// the client or application ID that the authority issues.
			client_id: environment.clientId,
			filterProtocolClaims: true,
			loadUserInfo: false,
			post_logout_redirect_uri: `${environment.appUrl}/signout-oidc`,
			redirect_uri: `${environment.appUrl}/signin-oidc`,
			response_type: "code",
			// response_mode: "query",
			scope: `openid offline_access profile email ${environment.scope}`,
			// number of millisecods to wait for the authorization
			// server to response to silent renew request
			silentRequestTimeoutInSeconds: 10000,
			silent_redirect_uri: `${environment.appUrl}/signin-oidc`,
			userStore: new WebStorageStateStore({
				prefix: "oidc",
				store: window.localStorage,
			}),
		} as UserManagerSettings;
	}
}
```
