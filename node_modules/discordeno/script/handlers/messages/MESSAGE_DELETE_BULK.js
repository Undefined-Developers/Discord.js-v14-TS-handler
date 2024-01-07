"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageDeleteBulk = void 0;
async function handleMessageDeleteBulk(bot, data) {
    const payload = data.d;
    const channelId = bot.transformers.snowflake(payload.channel_id);
    const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
    bot.events.messageDeleteBulk(bot, {
        ids: payload.ids.map((id) => bot.transformers.snowflake(id)),
        channelId: bot.transformers.snowflake(payload.channel_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    });
}
exports.handleMessageDeleteBulk = handleMessageDeleteBulk;
