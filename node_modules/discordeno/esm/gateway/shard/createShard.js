import * as dntShim from "../../_dnt.shims.js";
import { identify } from "./identify.js";
import { handleMessage } from "./handleMessage.js";
import { DEFAULT_HEARTBEAT_INTERVAL, GATEWAY_RATE_LIMIT_RESET_INTERVAL, MAX_GATEWAY_REQUESTS_PER_INTERVAL, ShardState, } from "./types.js";
import { startHeartbeating } from "./startHeartbeating.js";
import { stopHeartbeating } from "./stopHeartbeating.js";
import { resume } from "./resume.js";
import { createLeakyBucket } from "../../util/bucket.js";
import { calculateSafeRequests } from "./calculateSafeRequests.js";
import { send } from "./send.js";
import { handleClose } from "./handleClose.js";
import { connect } from "./connect.js";
import { close } from "./close.js";
import { shutdown } from "./shutdown.js";
import { isOpen } from "./isOpen.js";
import { API_VERSION } from "../../util/constants.js";
// TODO: debug
// TODO: function overwrite
// TODO: improve shard event resolving
/** */
export function createShard(options) {
    // This is done for performance reasons
    const calculateSafeRequestsOverwritten = options.calculateSafeRequests ?? calculateSafeRequests;
    const closeOverwritten = options.close ?? close;
    const connectOverwritten = options.connect ?? connect;
    const identifyOverwritten = options.identify ?? identify;
    const sendOverwritten = options.send ?? send;
    const shutdownOverwritten = options.shutdown ?? shutdown;
    const resumeOverwritten = options.resume ?? resume;
    const handleCloseOverwritten = options.handleClose ?? handleClose;
    const handleMessageOverwritten = options.handleMessage ?? handleMessage;
    const isOpenOverwritten = options.isOpen ?? isOpen;
    const startHeartbeatingOverwritten = options.startHeartbeating ?? startHeartbeating;
    const stopHeartbeatingOverwritten = options.stopHeartbeating ?? stopHeartbeating;
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
            version: options.gatewayConfig.version ?? API_VERSION,
        },
        /** This contains all the heartbeat information */
        heart: {
            acknowledged: false,
            interval: DEFAULT_HEARTBEAT_INTERVAL,
        },
        /** Id of the shard. */
        id: options.id,
        /** The maximum of requests which can be send to discord per rate limit tick.
         * Typically this value should not be changed.
         */
        maxRequestsPerRateLimitTick: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
        /** The previous payload sequence number. */
        previousSequenceNumber: options.previousSequenceNumber || null,
        /** In which interval (in milliseconds) the gateway resets it's rate limit. */
        rateLimitResetInterval: GATEWAY_RATE_LIMIT_RESET_INTERVAL,
        /** Current session id of the shard if present. */
        sessionId: undefined,
        /** This contains the WebSocket connection to Discord, if currently connected. */
        socket: undefined,
        /** Current internal state of the shard. */
        state: ShardState.Offline,
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
        bucket: createLeakyBucket({
            max: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
            refillInterval: GATEWAY_RATE_LIMIT_RESET_INTERVAL,
            refillAmount: MAX_GATEWAY_REQUESTS_PER_INTERVAL,
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
