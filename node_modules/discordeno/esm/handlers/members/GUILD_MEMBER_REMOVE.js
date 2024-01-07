export async function handleGuildMemberRemove(bot, data) {
    const payload = data.d;
    const guildId = bot.transformers.snowflake(payload.guild_id);
    const user = bot.transformers.user(bot, payload.user);
    bot.events.guildMemberRemove(bot, user, guildId);
}
