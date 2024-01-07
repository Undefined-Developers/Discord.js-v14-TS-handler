export function handleGuildScheduledEventDelete(bot, data) {
    const payload = data.d;
    bot.events.scheduledEventDelete(bot, bot.transformers.scheduledEvent(bot, payload));
}
