"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneChannel = void 0;
const deps_js_1 = require("../deps.js");
/** Create a copy of a channel */
async function cloneChannel(bot, channel, reason) {
    if (!channel.guildId) {
        throw new Error(`Cannot clone a channel outside a guild`);
    }
    const createChannelOptions = {
        type: channel.type,
        bitrate: channel.bitrate,
        userLimit: channel.userLimit,
        rateLimitPerUser: channel.rateLimitPerUser,
        position: channel.position,
        parentId: channel.parentId,
        nsfw: channel.nsfw,
        name: channel.name,
        topic: channel.topic || undefined,
        permissionOverwrites: channel.permissionOverwrites.map((overwrite) => {
            const [type, id, allow, deny] = (0, deps_js_1.separateOverwrites)(overwrite);
            return {
                id,
                type,
                allow: bot.utils.calculatePermissions(BigInt(allow)),
                deny: bot.utils.calculatePermissions(BigInt(deny)),
            };
        }),
    };
    //Create the channel (also handles permissions)
    return await bot.helpers.createChannel(channel.guildId, createChannelOptions, reason);
}
exports.cloneChannel = cloneChannel;
