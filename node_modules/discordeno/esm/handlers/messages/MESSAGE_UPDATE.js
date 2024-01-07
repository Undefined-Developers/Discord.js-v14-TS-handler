export async function handleMessageUpdate(bot, data) {
    const payload = data.d;
    if (!payload.edited_timestamp)
        return;
    bot.events.messageUpdate(bot, bot.transformers.message(bot, payload));
}
