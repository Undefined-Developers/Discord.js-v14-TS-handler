/** Get the applications info */
export async function getApplicationInfo(bot) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.OAUTH2_APPLICATION());
    return bot.transformers.application(bot, result);
}
