export async function handleVoiceStateUpdate(bot, data) {
    const payload = data.d;
    if (!payload.guild_id)
        return;
    const guildId = bot.transformers.snowflake(payload.guild_id);
    bot.events.voiceStateUpdate(bot, bot.transformers.voiceState(bot, { voiceState: payload, guildId }));
}
