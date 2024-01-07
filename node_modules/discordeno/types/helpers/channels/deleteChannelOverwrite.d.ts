import type { Bot } from "../../bot.js";
/** Delete the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
export declare function deleteChannelOverwrite(bot: Bot, channelId: bigint, overwriteId: bigint): Promise<void>;
