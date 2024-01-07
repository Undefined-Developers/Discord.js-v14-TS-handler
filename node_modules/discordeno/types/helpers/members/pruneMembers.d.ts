import type { Bot } from "../../bot.js";
/**
 * Begin a prune operation. Requires the KICK_MEMBERS permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the computePruneCount option to false, forcing 'pruned' to null. Fires multiple Guild Member Remove Gateway events.
 *
 * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the roles (resolved to include_roles internally) parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
 */
export declare function pruneMembers(bot: Bot, guildId: bigint, options: BeginGuildPrune): Promise<number>;
/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
    /** Number of days to prune (1 or more), default: 7 */
    days?: number;
    /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
    computePruneCount?: boolean;
    /** Role(s) ro include, default: none */
    includeRoles?: string[];
}
