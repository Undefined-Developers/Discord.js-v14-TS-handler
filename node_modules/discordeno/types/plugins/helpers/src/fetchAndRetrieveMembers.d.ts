import { BotWithCache } from "../../cache/src/addCacheCollections.js";
/** Fetch members for an entire guild then return the entire guilds cached members. */
export declare function fetchAndRetrieveMembers(bot: BotWithCache, guildId: bigint): Promise<import("../deps.js").Collection<bigint, import("../deps.js").Member>>;
