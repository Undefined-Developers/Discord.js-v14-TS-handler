"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformGatewayBot = void 0;
function transformGatewayBot(payload) {
    const gatewayBot = {
        url: payload.url,
        shards: payload.shards,
        sessionStartLimit: {
            total: payload.session_start_limit.total,
            remaining: payload.session_start_limit.remaining,
            resetAfter: payload.session_start_limit.reset_after,
            maxConcurrency: payload.session_start_limit.max_concurrency,
        },
    };
    return gatewayBot;
}
exports.transformGatewayBot = transformGatewayBot;
