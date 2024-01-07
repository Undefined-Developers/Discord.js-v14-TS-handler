export async function handleGuildBanAdd(bot, data) {
    const payload = data.d;
    bot.events.guildBanAdd(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
