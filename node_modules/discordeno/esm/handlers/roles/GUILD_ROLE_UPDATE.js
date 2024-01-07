export async function handleGuildRoleUpdate(bot, data) {
    const payload = data.d;
    bot.events.roleUpdate(bot, bot.transformers.role(bot, { role: payload.role, guildId: bot.transformers.snowflake(payload.guild_id) }));
}
