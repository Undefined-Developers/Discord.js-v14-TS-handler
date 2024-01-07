/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
import type { Bot } from "../../bot.js";
export declare function unpinMessage(bot: Bot, channelId: bigint, messageId: bigint): Promise<void>;
