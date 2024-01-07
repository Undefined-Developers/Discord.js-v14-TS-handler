export function handleGuildCreate(bot, data, shardId) {
    const payload = data.d;
    bot.events.guildCreate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
