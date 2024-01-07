/** Edit a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. */
export async function editWebhook(bot, webhookId, options) {
    const result = await bot.rest.runMethod(bot.rest, "PATCH", bot.constants.routes.WEBHOOK_ID(webhookId), {
        name: options.name,
        avatar: options.avatar,
        channel_id: options.channelId,
        reason: options.reason,
    });
    return bot.transformers.webhook(bot, result);
}
