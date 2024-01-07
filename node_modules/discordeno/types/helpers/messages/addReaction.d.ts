import type { Bot } from "../../bot.js";
/** Create a reaction for the message. Reaction takes the form of **name:id** for custom guild emoji, or Unicode characters. Requires READ_MESSAGE_HISTORY and ADD_REACTIONS */
export declare function addReaction(bot: Bot, channelId: bigint, messageId: bigint, reaction: string): Promise<void>;
