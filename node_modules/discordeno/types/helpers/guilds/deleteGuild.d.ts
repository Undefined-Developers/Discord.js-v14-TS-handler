import type { Bot } from "../../bot.js";
/** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
export declare function deleteGuild(bot: Bot, guildId: bigint): Promise<void>;
