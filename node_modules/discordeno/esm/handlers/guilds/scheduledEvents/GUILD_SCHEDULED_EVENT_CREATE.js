export function handleGuildScheduledEventCreate(bot, data, shardId) {
    const payload = data.d;
    bot.events.scheduledEventCreate(bot, bot.transformers.scheduledEvent(bot, payload));
}
