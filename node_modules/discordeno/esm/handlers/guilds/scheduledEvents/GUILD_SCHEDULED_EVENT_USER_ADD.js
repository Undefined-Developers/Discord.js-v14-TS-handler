export function handleGuildScheduledEventUserAdd(bot, data) {
    const payload = data.d;
    return bot.events.scheduledEventUserAdd(bot, {
        guildScheduledEventId: bot.transformers.snowflake(payload.guild_scheduled_event_id),
        userId: bot.transformers.snowflake(payload.user_id),
        guildId: bot.transformers.snowflake(payload.guild_id),
    });
}
