export function handleStageInstanceUpdate(bot, data) {
    const payload = data.d;
    bot.events.stageInstanceUpdate(bot, {
        id: bot.transformers.snowflake(payload.id),
        guildId: bot.transformers.snowflake(payload.guild_id),
        channelId: bot.transformers.snowflake(payload.channel_id),
        topic: payload.topic,
    });
}
