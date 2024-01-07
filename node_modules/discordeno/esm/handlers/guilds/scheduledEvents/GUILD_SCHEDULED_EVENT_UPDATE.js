export function handleGuildScheduledEventUpdate(bot, data) {
    const payload = data.d;
    bot.events.scheduledEventUpdate(bot, bot.transformers.scheduledEvent(bot, payload));
}
