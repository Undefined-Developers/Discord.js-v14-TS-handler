/** Suppress all the embeds in this message */
export async function suppressEmbeds(bot, channelId, messageId) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId), { flags: 4 });
    return bot.transformers.message(bot, result);
}
