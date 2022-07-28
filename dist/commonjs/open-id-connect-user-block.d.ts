import { User } from "oidc-client-ts";
import OpenIdConnect from "./open-id-connect";
export default class {
    protected openIdConnect: OpenIdConnect;
    user: User | null;
    get isLoggedIn(): boolean;
    constructor(openIdConnect: OpenIdConnect);
    attached(): Promise<void>;
    login(): void;
    logout(): void;
}
