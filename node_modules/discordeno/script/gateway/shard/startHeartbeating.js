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
exports.startHeartbeating = void 0;
const dntShim = __importStar(require("../../_dnt.shims.js"));
const shared_js_1 = require("../../types/shared.js");
const types_js_1 = require("./types.js");
function startHeartbeating(shard, interval) {
    //   gateway.debug("GW HEARTBEATING_STARTED", { shardId, interval });
    shard.heart.interval = interval;
    // Only set the shard's state to `Unidentified`
    // if heartbeating has not been started due to an identify or resume action.
    if ([types_js_1.ShardState.Disconnected, types_js_1.ShardState.Offline].includes(shard.state)) {
        shard.state = types_js_1.ShardState.Unidentified;
    }
    // The first heartbeat needs to be send with a random delay between `0` and `interval`
    // Using a `setTimeout(_, jitter)` here to accomplish that.
    // `Math.random()` can be `0` so we use `0.5` if this happens
    // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating
    const jitter = Math.ceil(shard.heart.interval * (Math.random() || 0.5));
    shard.heart.timeoutId = dntShim.setTimeout(() => {
        // Using a direct socket.send call here because heartbeat requests are reserved by us.
        shard.socket?.send(JSON.stringify({
            op: shared_js_1.GatewayOpcodes.Heartbeat,
            d: shard.previousSequenceNumber,
        }));
        shard.heart.lastBeat = Date.now();
        shard.heart.acknowledged = false;
        // After the random heartbeat jitter we can start a normal interval.
        shard.heart.intervalId = dntShim.setInterval(async () => {
            // gateway.debug("GW DEBUG", `Running setInterval in heartbeat file. Shard: ${shardId}`);
            // gateway.debug("GW HEARTBEATING", { shardId, shard: currentShard });
            // The Shard did not receive a heartbeat ACK from Discord in time,
            // therefore we have to assume that the connection has failed or got "zombied".
            // The Shard needs to start a re-identify action accordingly.
            // Reference: https://discord.com/developers/docs/topics/gateway#heartbeating-example-gateway-heartbeat-ack
            if (!shard.heart.acknowledged) {
                shard.close(types_js_1.ShardSocketCloseCodes.ZombiedConnection, "Zombied connection, did not receive an heartbeat ACK in time.");
                return await shard.identify();
            }
            shard.heart.acknowledged = false;
            // Using a direct socket.send call here because heartbeat requests are reserved by us.
            shard.socket?.send(JSON.stringify({
                op: shared_js_1.GatewayOpcodes.Heartbeat,
                d: shard.previousSequenceNumber,
            }));
            shard.heart.lastBeat = Date.now();
            shard.events.heartbeat?.(shard);
        }, shard.heart.interval);
    }, jitter);
}
exports.startHeartbeating = startHeartbeating;
