import type { Bot } from "../../bot.js";
/** Adds multiple reactions to a message. If `ordered` is true(default is false), it will add the reactions one at a time in the order provided. Note: Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export declare function addReactions(bot: Bot, channelId: bigint, messageId: bigint, reactions: string[], ordered?: boolean): Promise<void>;
