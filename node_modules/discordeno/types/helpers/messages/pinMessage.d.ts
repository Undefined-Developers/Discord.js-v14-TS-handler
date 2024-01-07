import type { Bot } from "../../bot.js";
/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export declare function pinMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<void>;
