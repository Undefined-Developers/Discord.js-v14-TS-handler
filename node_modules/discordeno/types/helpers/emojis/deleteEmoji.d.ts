import type { Bot } from "../../bot.js";
/** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
export declare function deleteEmoji(bot: Bot, guildId: bigint, id: bigint, reason?: string): Promise<void>;
