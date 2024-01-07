/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
export async function getOriginalInteractionResponse(bot, token) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token));
    return bot.transformers.message(bot, result);
}
