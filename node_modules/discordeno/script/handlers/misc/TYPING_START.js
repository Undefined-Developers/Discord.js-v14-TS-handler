"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTypingStart = void 0;
function handleTypingStart(bot, data) {
    const payload = data.d;
    const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;
    const userId = bot.transformers.snowflake(payload.user_id);
    bot.events.typingStart(bot, {
        guildId,
        channelId: bot.transformers.snowflake(payload.channel_id),
        userId,
        timestamp: payload.timestamp,
        member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId, userId) : undefined,
    });
}
exports.handleTypingStart = handleTypingStart;
