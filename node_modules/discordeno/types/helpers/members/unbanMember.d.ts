import type { Bot } from "../../bot.js";
/** Remove the ban for a user. Requires BAN_MEMBERS permission */
export declare function unbanMember(bot: Bot, guildId: bigint, id: bigint): Promise<void>;
