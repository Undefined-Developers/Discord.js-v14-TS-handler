/** Edit a webhook. Returns the updated webhook object on success. */
export async function editWebhookWithToken(bot, webhookId, webhookToken, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.WEBHOOK(webhookId, webhookToken), {
        name: options.name,
        avatar: options.avatar,
    });
    return bot.transformers.webhook(bot, result);
}
