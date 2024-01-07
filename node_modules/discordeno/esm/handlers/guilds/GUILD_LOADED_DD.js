export function handleGuildLoaded(bot, data, shardId) {
    const payload = data.d;
    const guild = bot.transformers.guild(bot, { guild: payload, shardId });
    bot.events.guildLoaded(bot, guild);
}
