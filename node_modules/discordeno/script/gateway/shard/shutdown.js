"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdown = void 0;
const types_js_1 = require("./types.js");
async function shutdown(shard) {
    shard.close(types_js_1.ShardSocketCloseCodes.Shutdown, "Shard shutting down.");
    shard.state = types_js_1.ShardState.Offline;
}
exports.shutdown = shutdown;
