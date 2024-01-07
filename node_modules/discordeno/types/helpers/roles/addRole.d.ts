import type { Bot } from "../../bot.js";
/** Add a role to the member */
export declare function addRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string): Promise<void>;
