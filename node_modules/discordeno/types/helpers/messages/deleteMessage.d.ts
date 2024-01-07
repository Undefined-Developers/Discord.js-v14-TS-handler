import type { Bot } from "../../bot.js";
/** Delete a message with the channel id and message id only. */
export declare function deleteMessage(bot: Bot, channelId: bigint, messageId: bigint, reason?: string, delayMilliseconds?: number): Promise<void>;
