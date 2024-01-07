/**
 * Returns an emoji for the given guild and emoji Id.
 */
export async function getEmoji(bot, guildId, emojiId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_EMOJI(guildId, emojiId));
    return bot.transformers.emoji(bot, result);
}
