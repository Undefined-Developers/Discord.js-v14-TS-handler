export async function handleMessageReactionRemove(bot, data) {
    const payload = data.d;
    bot.events.reactionRemove(bot, {
        userId: bot.transformers.snowflake(payload.user_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        messageId: bot.transformers.snowflake(payload.message_id),
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
        emoji: bot.transformers.emoji(bot, payload.emoji),
    });
}
