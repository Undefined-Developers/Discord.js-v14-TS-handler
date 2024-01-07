export function handleGuildUpdate(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildUpdate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
