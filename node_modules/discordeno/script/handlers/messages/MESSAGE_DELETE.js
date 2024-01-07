"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageDelete = void 0;
async function handleMessageDelete(bot, data) {
    const payload = data.d;
    bot.events.messageDelete(bot, {
        id: bot.transformers.snowflake(payload.id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    });
}
exports.handleMessageDelete = handleMessageDelete;
