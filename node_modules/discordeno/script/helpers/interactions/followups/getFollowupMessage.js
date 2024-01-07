"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowupMessage = void 0;
/** Returns a followup message for an Interaction. Functions the same as get webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
async function getFollowupMessage(bot, interactionToken, messageId) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, interactionToken, messageId));
    return bot.transformers.message(bot, result);
}
exports.getFollowupMessage = getFollowupMessage;
