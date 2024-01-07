import type { Bot } from "../../bot.js";
/** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. Bot needs MANAGE_THREADS permissions in the server if deleting thread. */
export declare function deleteChannel(bot: Bot, channelId: bigint, reason?: string): Promise<void>;
