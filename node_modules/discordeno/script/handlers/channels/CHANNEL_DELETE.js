"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChannelDelete = void 0;
async function handleChannelDelete(bot, data) {
    const payload = data.d;
    if (!payload.guild_id)
        return;
    bot.events.channelDelete(bot, bot.transformers.channel(bot, {
        channel: payload,
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    }));
}
exports.handleChannelDelete = handleChannelDelete;
