import type { Bot } from "../../bot.js";
/**
 * Deletes a template from a guild.
 * Requires the `MANAGE_GUILD` permission.
 */
export declare function deleteGuildTemplate(bot: Bot, guildId: bigint, templateCode: string): Promise<void>;
