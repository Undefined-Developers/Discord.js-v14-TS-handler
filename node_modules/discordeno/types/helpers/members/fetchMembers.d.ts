import type { Bot } from "../../bot.js";
/**
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
export declare function fetchMembers(bot: Bot, guildId: bigint, options?: Omit<RequestGuildMembers, "guildId">): Promise<void>;
/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
    /** id of the guild to get members for */
    guildId: bigint;
    /** String that username starts with, or an empty string to return all members */
    query?: string;
    /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
    limit: number;
    /** Used to specify if we want the presences of the matched members */
    presences?: boolean;
    /** Used to specify which users you wish to fetch */
    userIds?: bigint[];
    /** Nonce to identify the Guild Members Chunk response */
    nonce?: string;
}
