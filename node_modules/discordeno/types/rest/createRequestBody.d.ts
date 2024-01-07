import * as dntShim from "../_dnt.shims.js";
import { RestManager } from "./restManager.js";
import { RequestMethod } from "./rest.js";
/** Creates the request body and headers that are necessary to send a request. Will handle different types of methods and everything necessary for discord. */
export declare function createRequestBody(rest: RestManager, options: CreateRequestBodyOptions): {
    headers: Record<string, string>;
    body: string | dntShim.FormData;
    method: RequestMethod;
};
export interface CreateRequestBodyOptions {
    headers?: Record<string, string>;
    method: RequestMethod;
    body?: Record<string, unknown>;
    unauthorized?: boolean;
}
