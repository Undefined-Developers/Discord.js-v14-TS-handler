export async function handleGuildIntegrationsUpdate(bot, data) {
    const payload = data.d;
    bot.events.integrationUpdate(bot, { guildId: bot.transformers.snowflake(payload.guild_id) });
}
