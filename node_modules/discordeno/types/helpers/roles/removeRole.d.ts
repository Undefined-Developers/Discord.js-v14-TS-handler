import type { Bot } from "../../bot.js";
/** Remove a role from the member */
export declare function removeRole(bot: Bot, guildId: bigint, memberId: bigint, roleId: bigint, reason?: string): Promise<void>;
