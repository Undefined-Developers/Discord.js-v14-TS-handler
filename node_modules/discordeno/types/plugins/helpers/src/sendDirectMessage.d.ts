import { Bot, Collection, CreateMessage } from "../deps.js";
/** Maps the <userId, channelId> for dm channels */
export declare const dmChannelIds: Collection<bigint, bigint>;
/** Sends a direct message to a user. This can take two API calls. The first call is to create a dm channel. Then sending the message to that channel. Channel ids are cached as needed to prevent duplicate requests. */
export declare function sendDirectMessage(bot: Bot, userId: bigint, content: string | CreateMessage): Promise<import("../deps.js").Message>;
