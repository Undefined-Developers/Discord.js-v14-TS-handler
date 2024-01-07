import type { Bot } from "../../bot.js";
/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export declare function getPruneCount(bot: Bot, guildId: bigint, options?: GetGuildPruneCountQuery): Promise<number>;
/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
    /** Number of days to count prune for (1 or more), default: 7 */
    days?: number;
    /** Role(s) to include, default: none */
    includeRoles?: string | string[];
}
