export async function handleGuildDelete(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId);
}
