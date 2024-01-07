"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMembers = void 0;
const shared_js_1 = require("../../types/shared.js");
const calculateShardId_js_1 = require("../../util/calculateShardId.js");
/**
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
function fetchMembers(bot, guildId, options) {
    // You can request 1 member without the intent
    // Check if intents is not 0 as proxy ws won't set intents in other instances
    if (bot.intents && (!options?.limit || options.limit > 1) && !(bot.intents & shared_js_1.GatewayIntents.GuildMembers)) {
        throw new Error(bot.constants.Errors.MISSING_INTENT_GUILD_MEMBERS);
    }
    if (options?.userIds?.length) {
        options.limit = options.userIds.length;
    }
    const shardId = (0, calculateShardId_js_1.calculateShardId)(bot.gateway, guildId);
    return new Promise((resolve) => {
        const nonce = `${guildId}-${Date.now()}`;
        bot.cache.fetchAllMembersProcessingRequests.set(nonce, resolve);
        const shard = bot.gateway.manager.shards.get(shardId);
        if (!shard) {
            throw new Error(`Shard (id: ${shardId}) not found.`);
        }
        shard.send({
            op: shared_js_1.GatewayOpcodes.RequestGuildMembers,
            d: {
                guild_id: guildId.toString(),
                // If a query is provided use it, OR if a limit is NOT provided use ""
                query: options?.query || (options?.limit ? undefined : ""),
                limit: options?.limit || 0,
                presences: options?.presences || false,
                user_ids: options?.userIds?.map((id) => id.toString()),
                nonce,
            },
        });
    });
}
exports.fetchMembers = fetchMembers;
