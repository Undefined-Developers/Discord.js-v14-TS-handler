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
exports.connect = void 0;
const dntShim = __importStar(require("../../_dnt.shims.js"));
const types_js_1 = require("./types.js");
async function connect(shard) {
    // Only set the shard to `Connecting` state,
    // if the connection request does not come from an identify or resume action.
    if (![types_js_1.ShardState.Identifying, types_js_1.ShardState.Resuming].includes(shard.state)) {
        shard.state = types_js_1.ShardState.Connecting;
    }
    shard.events.connecting?.(shard);
    // Explicitly setting the encoding to json, since we do not support ETF.
    const socket = new dntShim.WebSocket(`${shard.gatewayConfig.url}/?v=${shard.gatewayConfig.version}&encoding=json`);
    shard.socket = socket;
    // TODO: proper event handling
    socket.onerror = (event) => console.log({ error: event });
    socket.onclose = (event) => shard.handleClose(event);
    socket.onmessage = (message) => shard.handleMessage(message);
    return new Promise((resolve) => {
        socket.onopen = () => {
            // Only set the shard to `Unidentified` state,
            // if the connection request does not come from an identify or resume action.
            if (![types_js_1.ShardState.Identifying, types_js_1.ShardState.Resuming].includes(shard.state)) {
                shard.state = types_js_1.ShardState.Unidentified;
            }
            shard.events.connected?.(shard);
            resolve();
        };
    });
}
exports.connect = connect;
