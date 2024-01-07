/** Sends a text message. */
export async function sendTextMessage(bot, channelId, content) {
    if (typeof content === "string")
        content = { content };
    return bot.helpers.sendMessage(channelId, content);
}
