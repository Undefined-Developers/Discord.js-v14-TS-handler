import type { Bot } from "../../bot.js";
/** Delete a guild role. Requires the MANAGE_ROLES permission. */
export declare function deleteRole(bot: Bot, guildId: bigint, id: bigint): Promise<void>;
