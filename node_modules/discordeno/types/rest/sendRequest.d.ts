import * as dntShim from "../_dnt.shims.js";
import { RequestMethod } from "./rest.js";
import { RestManager } from "./restManager.js";
export interface RestSendRequestOptions {
    url: string;
    method: RequestMethod;
    bucketId?: string;
    reject?: Function;
    respond?: Function;
    retryCount?: number;
    payload?: {
        headers: Record<string, string>;
        body: string | dntShim.FormData;
    };
}
export declare function sendRequest<T>(rest: RestManager, options: RestSendRequestOptions): Promise<T>;
