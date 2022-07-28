export default class OpenIdConnectLogger {
    private _level;
    get level(): number;
    constructor(level: number);
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    private setLogLevel;
}
