import type { Bot } from "../../bot.js";
/** Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a undefined on success */
export declare function deleteWebhook(bot: Bot, webhookId: bigint, reason?: string): Promise<void>;
