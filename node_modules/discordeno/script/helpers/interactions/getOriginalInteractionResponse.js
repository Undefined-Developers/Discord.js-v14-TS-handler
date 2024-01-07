"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOriginalInteractionResponse = void 0;
/** Returns the initial Interaction response. Functions the same as Get Webhook Message */
async function getOriginalInteractionResponse(bot, token) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token));
    return bot.transformers.message(bot, result);
}
exports.getOriginalInteractionResponse = getOriginalInteractionResponse;
