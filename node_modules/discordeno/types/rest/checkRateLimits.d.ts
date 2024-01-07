import { RestManager } from "./restManager.js";
/** Check the rate limits for a url or a bucket. */
export declare function checkRateLimits(rest: RestManager, url: string): number | false;
