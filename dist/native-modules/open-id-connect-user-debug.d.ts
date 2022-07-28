import OpenIdConnectUserBlock from './open-id-connect-user-block';
export default class extends OpenIdConnectUserBlock {
    loginSilent(): Promise<void>;
    get stringifiedUser(): string;
}
