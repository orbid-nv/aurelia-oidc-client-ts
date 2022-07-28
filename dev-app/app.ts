import { Aurelia, autoinject } from "aurelia-framework";
import { UserManager } from "oidc-client-ts";
import { OpenIdConnect } from "resources";

@autoinject
export class App {
  public message = "from Aurelia!";

  private redirectUrl: string;
  private authorityUrl: string;

  public constructor(
    private userManager: UserManager,
    private oidcConnect: OpenIdConnect
  ) {}

  attached() {
    this.redirectUrl = window.location.href;
  }

  setupClient(): void {
    //
  }

  private async login() {
    const u = await this.userManager.getUser();
    console.log(u);
    this.oidcConnect.login();
  }
}
