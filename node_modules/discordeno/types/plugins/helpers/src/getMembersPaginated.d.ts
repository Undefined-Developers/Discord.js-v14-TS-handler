import { Bot, Collection, ListGuildMembers, Member } from "../deps.js";
/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export declare function getMembersPaginated(bot: Bot, guildId: bigint, options: ListGuildMembers): Promise<Collection<bigint, Member>>;
