export async function handleThreadDelete(bot, data) {
    const payload = data.d;
    bot.events.threadDelete(bot, bot.transformers.channel(bot, { channel: payload }));
}
