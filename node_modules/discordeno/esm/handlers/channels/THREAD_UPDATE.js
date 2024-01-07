export async function handleThreadUpdate(bot, data) {
    const payload = data.d;
    bot.events.threadUpdate(bot, bot.transformers.channel(bot, { channel: payload }));
}
