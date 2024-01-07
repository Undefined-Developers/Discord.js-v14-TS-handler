import type { Bot } from "../../bot.js";
/** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
export declare function followChannel(bot: Bot, sourceChannelId: bigint, targetChannelId: bigint): Promise<bigint>;
