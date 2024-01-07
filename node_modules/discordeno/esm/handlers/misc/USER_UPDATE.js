export async function handleUserUpdate(bot, data) {
    const payload = data.d;
    bot.events.botUpdate(bot, bot.transformers.user(bot, payload));
}
