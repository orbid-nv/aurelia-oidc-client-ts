import { UserManagerSettings } from "oidc-client-ts";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
export default class {
    [key: string]: any;
    private _loginRedirectRoute;
    private _logoutRedirectRoute;
    private _unauthorizedRedirectRoute;
    private _logLevel;
    private _userManagerSettings;
    get loginRedirectRoute(): string;
    get logoutRedirectRoute(): string;
    get unauthorizedRedirectRoute(): string;
    get logLevel(): number;
    get userManagerSettings(): UserManagerSettings;
    get redirectUri(): string;
    get postLogoutRedirectUri(): string;
    constructor(dto?: OpenIdConnectConfiguration);
    private ensureRouteValueBeginsWithSlash;
}
