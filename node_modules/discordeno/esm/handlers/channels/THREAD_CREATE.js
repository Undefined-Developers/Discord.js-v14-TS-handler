export async function handleThreadCreate(bot, data) {
    const payload = data.d;
    bot.events.threadCreate(bot, bot.transformers.channel(bot, { channel: payload }));
}
