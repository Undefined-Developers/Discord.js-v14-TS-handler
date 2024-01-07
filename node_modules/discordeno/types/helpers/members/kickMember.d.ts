import { Bot } from "../../bot.js";
/** Kick a member from the server */
export declare function kickMember(bot: Bot, guildId: bigint, memberId: bigint, reason?: string): Promise<void>;
