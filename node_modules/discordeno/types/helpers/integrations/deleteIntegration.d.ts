import type { Bot } from "../../bot.js";
/** Delete the attached integration object for the guild with this id. Requires MANAGE_GUILD permission. */
export declare function deleteIntegration(bot: Bot, guildId: bigint, id: bigint): Promise<void>;
