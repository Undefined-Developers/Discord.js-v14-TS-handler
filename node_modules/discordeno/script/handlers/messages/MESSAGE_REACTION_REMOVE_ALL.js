"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageReactionRemoveAll = void 0;
async function handleMessageReactionRemoveAll(bot, data) {
    const payload = data.d;
    bot.events.reactionRemoveAll(bot, {
        channelId: bot.transformers.snowflake(payload.channel_id),
        messageId: bot.transformers.snowflake(payload.message_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    });
}
exports.handleMessageReactionRemoveAll = handleMessageReactionRemoveAll;
