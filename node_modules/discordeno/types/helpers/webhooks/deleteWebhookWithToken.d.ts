import type { Bot } from "../../bot.js";
/** Delete a webhook permanently. Returns a undefined on success */
export declare function deleteWebhookWithToken(bot: Bot, webhookId: bigint, webhookToken: string): Promise<void>;
