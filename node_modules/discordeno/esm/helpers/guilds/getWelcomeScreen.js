/** Returns the Welcome Screen object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getWelcomeScreen(bot, guildId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.GUILD_WELCOME_SCREEN(guildId));
    return bot.transformers.welcomeScreen(bot, result);
}
