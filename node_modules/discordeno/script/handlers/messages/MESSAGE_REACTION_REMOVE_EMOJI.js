"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageReactionRemoveEmoji = void 0;
async function handleMessageReactionRemoveEmoji(bot, data) {
    const payload = data.d;
    bot.events.reactionRemoveEmoji(bot, {
        channelId: bot.transformers.snowflake(payload.channel_id),
        messageId: bot.transformers.snowflake(payload.message_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
        emoji: bot.transformers.emoji(bot, payload.emoji),
    });
}
exports.handleMessageReactionRemoveEmoji = handleMessageReactionRemoveEmoji;
