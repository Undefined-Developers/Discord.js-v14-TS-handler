"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = void 0;
const utils_js_1 = require("../../util/utils.js");
async function stop(gateway, code, reason) {
    gateway.manager.shards.forEach((shard) => shard.close(code, reason));
    await (0, utils_js_1.delay)(5000);
}
exports.stop = stop;
