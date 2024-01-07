import type { Bot } from "../../bot.js";
/** Delete messages from the channel. 2-100. Requires the MANAGE_MESSAGES permission */
export declare function deleteMessages(bot: Bot, channelId: bigint, ids: bigint[], reason?: string): Promise<void>;
