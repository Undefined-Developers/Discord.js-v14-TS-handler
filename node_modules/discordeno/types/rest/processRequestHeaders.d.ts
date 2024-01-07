import * as dntShim from "../_dnt.shims.js";
import { RestManager } from "./restManager.js";
/** Processes the rate limit headers and determines if it needs to be rate limited and returns the bucket id if available */
export declare function processRequestHeaders(rest: RestManager, url: string, headers: dntShim.Headers): string | undefined;
