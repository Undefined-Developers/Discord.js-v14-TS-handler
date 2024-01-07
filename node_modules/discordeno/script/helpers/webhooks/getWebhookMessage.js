"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhookMessage = void 0;
/** Returns a previously-sent webhook message from the same token. Returns a message object on success. */
async function getWebhookMessage(bot, webhookId, webhookToken, messageId, options) {
    const result = await bot.rest.runMethod(bot.rest, "GET", bot.constants.routes.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId, options));
    return bot.transformers.message(bot, result);
}
exports.getWebhookMessage = getWebhookMessage;
