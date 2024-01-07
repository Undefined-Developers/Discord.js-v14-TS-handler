import { Bot } from "../deps.js";
/** Kicks a member from a voice channel */
export declare function disconnectMember(bot: Bot, guildId: bigint, memberId: bigint): Promise<import("../deps.js").Member>;
