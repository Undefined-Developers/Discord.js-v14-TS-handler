import { Bot } from "../deps.js";
/**
 * Move a member from a voice channel to another.
 */
export declare function moveMember(bot: Bot, guildId: bigint, memberId: bigint, channelId: bigint): Promise<import("../deps.js").Member>;
