"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRateLimitedPaths = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
/** This will create a infinite loop running in 1 seconds using tail recursion to keep rate limits clean. When a rate limit resets, this will remove it so the queue can proceed. */
function processRateLimitedPaths(rest) {
    const now = Date.now();
    for (const [key, value] of rest.rateLimitedPaths.entries()) {
        rest.debug(`[REST - processRateLimitedPaths] Running for of loop. ${value.resetTimestamp - now}`);
        // IF THE TIME HAS NOT REACHED CANCEL
        if (value.resetTimestamp > now)
            continue;
        // RATE LIMIT IS OVER, DELETE THE RATE LIMITER
        rest.rateLimitedPaths.delete(key);
        // IF IT WAS GLOBAL ALSO MARK THE GLOBAL VALUE AS FALSE
        if (key === "global")
            rest.globallyRateLimited = false;
    }
    // ALL PATHS ARE CLEARED CAN CANCEL OUT!
    if (!rest.rateLimitedPaths.size) {
        rest.processingRateLimitedPaths = false;
    }
    else {
        rest.processingRateLimitedPaths = true;
        // RECHECK IN 1 SECOND
        dntShim.setTimeout(() => {
            rest.debug(`[REST - processRateLimitedPaths] Running setTimeout.`);
            rest.processRateLimitedPaths(rest);
        }, 1000);
    }
}
exports.processRateLimitedPaths = processRateLimitedPaths;
