import { RestManager } from "./restManager.js";
import { RestPayload, RestRequest } from "./rest.js";
/** Processes a request and assigns it to a queue or creates a queue if none exists for it. */
export declare function processRequest(rest: RestManager, request: RestRequest, payload: RestPayload): void;
