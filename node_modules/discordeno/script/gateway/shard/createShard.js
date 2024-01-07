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
exports.createShard = void 0;
const dntShim = __importStar(require("../../_dnt.shims.js"));
const identify_js_1 = require("./identify.js");
const handleMessage_js_1 = require("./handleMessage.js");
const types_js_1 = require("./types.js");
const startHeartbeating_js_1 = require("./startHeartbeating.js");
const stopHeartbeating_js_1 = require("./stopHeartbeating.js");
const resume_js_1 = require("./resume.js");
const bucket_js_1 = require("../../util/bucket.js");
const calculateSafeRequests_js_1 = require("./calculateSafeRequests.js");
const send_js_1 = require("./send.js");
const handleClose_js_1 = require("./handleClose.js");
const connect_js_1 = require("./connect.js");
const close_js_1 = require("./close.js");
const shutdown_js_1 = require("./shutdown.js");
const isOpen_js_1 = require("./isOpen.js");
const constants_js_1 = require("../../util/constants.js");
// TODO: debug
// TODO: function overwrite
// TODO: improve shard event resolving
/** */
function createShard(options) {
    // This is done for performance reasons
    const calculateSafeRequestsOverwritten = options.calculateSafeRequests ?? calculateSafeRequests_js_1.calculateSafeRequests;
    const closeOverwritten = options.close ?? close_js_1.close;
    const connectOverwritten = options.connect ?? connect_js_1.connect;
    const identifyOverwritten = options.identify ?? identify_js_1.identify;
    const sendOverwritten = options.send ?? send_js_1.send;
    const shutdownOverwritten = options.shutdown ?? shutdown_js_1.shutdown;
    const resumeOverwritten = options.resume ?? resume_js_1.resume;
    const handleCloseOverwritten = options.handleClose ?? handleClose_js_1.handleClose;
    const handleMessageOverwritten = options.handleMessage ?? handleMessage_js_1.handleMessage;
    const isOpenOverwritten = options.isOpen ?? isOpen_js_1.isOpen;
    const startHeartbeatingOverwritten = options.startHeartbeating ?? startHeartbeating_js_1.startHeartbeating;
    const stopHeartbeatingOverwritten = options.stopHeartbeating ?? stopHeartbeating_js_1.stopHeartbeating;
    return {
        // ----------
        // PROPERTIES
        // ----------
        /** The gateway configuration which is used to connect to Discord. */
        gatewayConfig: {
            compress: options.gatewayConfig.compress ?? false,
            intents: options.gatewayConfig.intents ?? 0,
            properties: {
                os: options.gatewayConfig?.properties?.os ?? dntShim.Deno.build.os,
                browser: options.gatewayConfig?.properties?.browser ?? "Discordeno",
                device: options.gatewayConfig?.properties?.device ?? "Discordeno",
            },
            token: options.gatewayConfig.token,
            url: options.gatewayConfig.url ?? "wss://gateway.discord.gg",
            version: options.gatewayConfig.version ?? constants_js_1.API_VERSION,
        },
        /** This contains all the heartbeat information */
        heart: {
            acknowledged: false,
            interval: types_js_1.DEFAULT_HEARTBEAT_INTERVAL,
        },
        /** Id of the shard. */
        id: options.id,
        /** The maximum of requests which can be send to discord per rate limit tick.
         * Typically this value should not be changed.
         */
        maxRequestsPerRateLimitTick: types_js_1.MAX_GATEWAY_REQUESTS_PER_INTERVAL,
        /** The previous payload sequence number. */
        previousSequenceNumber: options.previousSequenceNumber || null,
        /** In which interval (in milliseconds) the gateway resets it's rate limit. */
        rateLimitResetInterval: types_js_1.GATEWAY_RATE_LIMIT_RESET_INTERVAL,
        /** Current session id of the shard if present. */
        sessionId: undefined,
        /** This contains the WebSocket connection to Discord, if currently connected. */
        socket: undefined,
        /** Current internal state of the shard. */
        state: types_js_1.ShardState.Offline,
        /** The total amount of shards which are used to communicate with Discord. */
        totalShards: options.totalShards,
        // ----------
        // METHODS
        // ----------
        /** The shard related event handlers. */
        events: options.events ?? {},
        /** Calculate the amount of requests which can safely be made per rate limit interval,
         * before the gateway gets disconnected due to an exceeded rate limit.
         */
        calculateSafeRequests: function () {
            return calculateSafeRequestsOverwritten(this);
        },
        /** Close the socket connection to discord if present. */
        close: function (code, reason) {
            return closeOverwritten(this, code, reason);
        },
        /** Connect the shard with the gateway and start heartbeating.
         * This will not identify the shard to the gateway.
         */
        connect: async function () {
            return await connectOverwritten(this);
        },
        /** Identify the shard to the gateway.
         * If not connected, this will also connect the shard to the gateway.
         */
        identify: async function () {
            return await identifyOverwritten(this);
        },
        /** Check whether the connection to Discord is currently open. */
        isOpen: function () {
            return isOpenOverwritten(this);
        },
        /** Function which can be overwritten in order to get the shards presence. */
        // This function allows to be async, in case the devs create the presence based on eg. database values.
        // Passing the shard's id there to make it easier for the dev to use this function.
        makePresence: options.makePresence,
        /** Attempt to resume the previous shards session with the gateway. */
        resume: async function () {
            return await resumeOverwritten(this);
        },
        /** Send a message to Discord.
         * @param {boolean} [highPriority=false] - Whether this message should be send asap.
         */
        send: async function (message, highPriority = false) {
            return await sendOverwritten(this, message, highPriority);
        },
        /** Shutdown the shard.
         * Forcefully disconnect the shard from Discord.
         * The shard may not attempt to reconnect with Discord.
         */
        shutdown: async function () {
            return await shutdownOverwritten(this);
        },
        /** @private Internal shard bucket.
         * Only access this if you know what you are doing.
         *
         * Bucket for handling shard request rate limits.
         */
        bucket: (0, bucket_js_1.createLeakyBucket)({
            max: types_js_1.MAX_GATEWAY_REQUESTS_PER_INTERVAL,
            refillInterval: types_js_1.GATEWAY_RATE_LIMIT_RESET_INTERVAL,
            refillAmount: types_js_1.MAX_GATEWAY_REQUESTS_PER_INTERVAL,
        }),
        /** @private Internal shard function.
         * Only use this function if you know what you are doing.
         *
         * Handle a gateway connection close.
         */
        handleClose: async function (close) {
            return await handleCloseOverwritten(this, close);
        },
        /** @private Internal shard function.
         * Only use this function if you know what you are doing.
         *
         * Handle an incoming gateway message.
         */
        handleMessage: async function (message) {
            return await handleMessageOverwritten(this, message);
        },
        /** This function communicates with the management process, in order to know whether its free to identify. */
        requestIdentify: async function () {
            return await options.requestIdentify(this.id);
        },
        /** @private Internal state.
         * Only use this if you know what you are doing.
         *
         * Cache for pending gateway requests which should have been send while the gateway went offline.
         */
        offlineSendQueue: [],
        /** @private Internal shard map.
         * Only use this map if you know what you are doing.
         *
         * This is used to resolve internal waiting states.
         * Mapped by SelectedEvents => ResolveFunction
         */
        resolves: new Map(),
        /** @private Internal shard function.
         * Only use this function if you know what you are doing.
         *
         * Start sending heartbeat payloads to Discord in the provided interval.
         */
        startHeartbeating: function (interval) {
            return startHeartbeatingOverwritten(this, interval);
        },
        /** @private Internal shard function.
         * Only use this function if you know what you are doing.
         *
         * Stop the heartbeating process with discord.
         */
        stopHeartbeating: function () {
            return stopHeartbeatingOverwritten(this);
        },
    };
}
exports.createShard = createShard;
