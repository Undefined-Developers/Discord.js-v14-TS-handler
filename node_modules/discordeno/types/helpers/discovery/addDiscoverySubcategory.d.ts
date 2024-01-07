import type { Bot } from "../../bot.js";
/** Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission. */
export declare function addDiscoverySubcategory(bot: Bot, guildId: bigint, categoryId: number): Promise<void>;
