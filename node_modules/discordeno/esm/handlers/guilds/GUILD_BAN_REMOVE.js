export async function handleGuildBanRemove(bot, data) {
    const payload = data.d;
    await bot.events.guildBanRemove(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
