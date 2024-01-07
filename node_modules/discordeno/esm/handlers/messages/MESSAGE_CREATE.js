export async function handleMessageCreate(bot, data) {
    const payload = data.d;
    bot.events.messageCreate(bot, bot.transformers.message(bot, payload));
}
