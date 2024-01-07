export async function handlePresenceUpdate(bot, data) {
    bot.events.presenceUpdate(bot, bot.transformers.presence(bot, data.d));
}
