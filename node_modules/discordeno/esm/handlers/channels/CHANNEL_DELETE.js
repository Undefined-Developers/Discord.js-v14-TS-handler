export async function handleChannelDelete(bot, data) {
    const payload = data.d;
    if (!payload.guild_id)
        return;
    bot.events.channelDelete(bot, bot.transformers.channel(bot, {
        channel: payload,
        guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    }));
}
