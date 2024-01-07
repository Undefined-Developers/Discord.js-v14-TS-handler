import { Bot } from "../../../bot.js";
/** Deletes a followup message for an Interaction. Functions the same as delete webhook message, however this uses your interaction token instead of bot token. Does not support ephemeral followups. */
export declare function deleteFollowupMessage(bot: Bot, interactionToken: string, messageId: bigint): Promise<void>;
