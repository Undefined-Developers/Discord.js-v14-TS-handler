"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannel = void 0;
const shared_js_1 = require("../../types/shared.js");
/** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
async function createChannel(bot, guildId, options, reason) {
    // BITRATE IS IN THOUSANDS SO IF USER PROVIDES 32 WE CONVERT TO 32000
    if (options?.bitrate && options.bitrate < 1000)
        options.bitrate *= 1000;
    const result = await bot.rest.runMethod(bot.rest, "POST", bot.constants.routes.GUILD_CHANNELS(guildId), options
        ? {
            name: options.name,
            topic: options.topic,
            bitrate: options.bitrate,
            user_limit: options.userLimit,
            rate_limit_per_user: options.rateLimitPerUser,
            position: options.position,
            parent_id: options.parentId?.toString(),
            nsfw: options.nsfw,
            permission_overwrites: options?.permissionOverwrites?.map((overwrite) => ({
                id: overwrite.id.toString(),
                type: overwrite.type,
                allow: overwrite.allow ? bot.utils.calculateBits(overwrite.allow) : null,
                deny: overwrite.deny ? bot.utils.calculateBits(overwrite.deny) : null,
            })),
            type: options?.type || shared_js_1.ChannelTypes.GuildText,
            reason,
            default_auto_archive_duration: options?.defaultAutoArchiveDuration,
        }
        : {});
    return bot.transformers.channel(bot, { channel: result, guildId });
}
exports.createChannel = createChannel;
