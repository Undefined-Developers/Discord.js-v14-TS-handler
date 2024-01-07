import type { Bot } from "../../bot.js";
/** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
export declare function deleteStageInstance(bot: Bot, channelId: bigint): Promise<void>;
